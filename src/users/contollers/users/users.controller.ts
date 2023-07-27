import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }

  @Get()
  getUsers() {
    return this.userService.fetchUsers()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData)
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    const user = this.userService.fetchUserById(id)
    if (!user.length) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }
    return user
  }

}
