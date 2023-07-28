import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './contollers/users/users.controller';
import { Logger } from './middlewares/logger/logger.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes(UsersController)
  }
}
