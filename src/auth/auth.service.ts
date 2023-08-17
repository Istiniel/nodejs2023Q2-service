import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/auth/dto/SignInDto';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,) { }

  async signIn({ login, password }: SignInDto) {
    const user = await this.usersService.getUser(login);

    if (!user) {
      throw new BadRequestException('User with such id is not found');
    }

    if (password !== user.password) {
      throw new BadRequestException('Incorrect username or password');
    }

    const payload = {
      userId: user.id,
      login: user.login
    }

    // const tokens = await this.getTokens(user.id, user.username);
    // await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };;
  }
}

