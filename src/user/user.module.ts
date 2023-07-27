import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController as UserController } from './contollers/user/user.controller';
import { UserService as UserService } from './services/user/user.service';
import { Logger } from './middlewares/logger/logger.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes(UserController)
  }
}
