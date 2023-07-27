import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  private fakeUsers = []

  fetchUsers() {
    return this.fakeUsers
  }

  createUser(userData: CreateUserDto) {
    this.fakeUsers.push(userData)
    return;
  }

  fetchUserById(targetId: string) {
    return this.fakeUsers.filter(id => id === targetId)
  }
}
