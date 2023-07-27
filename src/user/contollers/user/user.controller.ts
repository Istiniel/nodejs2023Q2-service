import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UserService } from '../../services/user/user.service';
import UpdatePasswordDto from '../../dtos/UpdatePassword.dto';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

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
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getUser(id)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updatePassword(@Body() userData: UpdatePasswordDto, @Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getUser(id)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    if (user.password !== userData.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN)
    }

    return this.userService.updatePassword(userData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.getUser(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    this.userService.deleteUser(id)
  }

}
