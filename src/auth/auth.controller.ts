import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RefreshDto } from 'src/auth/dto/RefreshDto';
import { SignInDto } from 'src/auth/dto/SignInDto';
import { SignUpDto } from 'src/auth/dto/SignUpDto';
import { Public } from 'src/helpers/setMetadata';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signInDto: SignUpDto) {
    return await this.authService.signUp(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async updateRefresh(@Body() refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto
    return await this.authService.refreshToken(refreshToken);
  }
}
