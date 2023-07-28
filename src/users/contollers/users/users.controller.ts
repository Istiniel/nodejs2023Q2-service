import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import UpdatePasswordDto from '../../dtos/UpdatePassword.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('user')
export class UsersController {

  constructor(private userService: UsersService) { }

  @Get()
  getUsers() {
    return this.userService.getUsers()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData)
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getUser(id)
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updatePassword(@Body() userData: UpdatePasswordDto, @Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getUser(id)
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== userData.oldPassword) {
      throw new ForbiddenException('No access')
    }

    return this.userService.updatePassword(userData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getUser(id)

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userService.deleteUser(id)
  }

}
