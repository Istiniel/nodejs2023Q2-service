import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';


@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true
    }), UsersModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },]
})
export class AuthModule { }
