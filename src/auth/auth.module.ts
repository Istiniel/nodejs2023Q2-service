import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

const configService = new ConfigService();

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: configService.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },]
})
export class AuthModule { }
