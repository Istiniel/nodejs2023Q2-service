import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/auth/dto/SignInDto';
import { SignUpDto } from 'src/auth/dto/SignUpDto';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';

const configService = new ConfigService();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,) { }

  async signIn({ login, password }: SignInDto) {
    const user = await this.usersService.getUserByLogin(login);

    if (!user) {
      throw new NotFoundException('User with such id is not found');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Incorrect username or password');
    }

    const { accessToken, refreshToken } = await this.createTokens(user.id, user.login)

    return {
      accessToken,
      refreshToken
    };
  }

  async signUp({ login, password }: SignUpDto) {
    // const user = await this.usersService.getUserByLogin(login);

    // if (user) {
    //   throw new BadRequestException('Such a user already exists!');
    // }

    const newUser = await this.usersService.createUser({ login, password })

    const { id: newUserId, login: newUserLogin } = newUser;
    const{refreshToken}=await this.createTokens(newUserId, newUserLogin)

    return {
      id: newUserId,
      refreshToken
    };
  }

  async refreshToken(oldRefreshToken: string) {
    const secret = configService.get('JWT_SECRET_REFRESH_KEY');

    type UserCredentials = {
      userId: string,
      login: string,
    }

    try {
      const userInfo = this.jwtService.verify<UserCredentials>(oldRefreshToken, { secret });

      const { refreshToken } = await this.createTokens(userInfo.userId, userInfo.login)

      return { refreshToken }
    } catch (error) {
      throw new ForbiddenException(error.message);
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

