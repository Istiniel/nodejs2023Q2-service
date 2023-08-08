import { Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import UpdatePasswordDto from 'src/users/dtos/UpdatePassword.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

  constructor(private userService: UsersService) { }

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers()
    return users
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.createUser(userData)
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = (await this.userService.getUser(id))

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updatePassword(@Body() userData: UpdatePasswordDto, @Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUser(id)
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== userData.oldPassword) {
      throw new ForbiddenException('No access')
    }

    return await this.userService.updatePassword(
      user, userData.newPassword
    )
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUser(id)

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userService.deleteUser(user.id)
  }
}
