import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/auth/dto/SignInDto';
import { SignUpDto } from 'src/auth/dto/SignUpDto';
import { UsersService } from 'src/users/services/users/users.service';

const configService = new ConfigService();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,) { }

  async signIn({ login, password }: SignInDto) {
    const user = await this.usersService.getUserByLogin(login);

    if (!user) {
      throw new BadRequestException('User with such id is not found');
    }

    if (password !== user.password) {
      throw new BadRequestException('Incorrect username or password');
    }

    const { accessToken } = await this.createTokens(user.id, user.login)

    return {
      accessToken,
    };
  }

  async signUp({ login, password }: SignUpDto) {
    // const user = await this.usersService.getUserByLogin(login);

    // if (user) {
    //   throw new BadRequestException('Such a user already exists!');
    // }

    const newUser = await this.usersService.createUser({ login, password })

    const { id: newUserId, login: newUserLogin } = newUser;
    await this.createTokens(newUserId, newUserLogin)

    return {
      id: newUserId,
    };
  }

  async refreshToken(login: string) {
    const user = await this.usersService.getUserByLogin(login);

    if (user) {
      throw new BadRequestException('Such a user already exists!');
    }

    const { accessToken } = await this.createTokens(user.id, user.login)

    return {
      accessToken
    }
  }

  async createTokens(id: string, name: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        userId: id,
        login: name
      },
      {
        secret: configService.get('JWT_SECRET_KEY'),
        expiresIn: configService.get('TOKEN_EXPIRE_TIME'),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: id,
        login: name
      },
      {
        secret: configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      },
    )


    return { accessToken, refreshToken };
  }
}

