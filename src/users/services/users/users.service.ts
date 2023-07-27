import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { User } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import UpdatePasswordDto from '../../dtos/UpdatePassword.dto';

@Injectable()
export class UsersService {
  private fakeUsers: User[] = []

  fetchUsers() {
    return this.fakeUsers
  }

  createUser(userData: CreateUserDto) {
    const id = uuidv4();
    this.fakeUsers.push({ ...userData, id, version: 1, createdAt: 1, updatedAt: 1 })
    return this.fakeUsers.filter(user => user.id === id)[0];
  }

  getUser(id: string) {
    return this.fakeUsers.filter(user => user.id === id)[0]
  }

  updatePassword(userData: UpdatePasswordDto, id: string) {
    const user = this.fakeUsers.filter(user => user.id === id)[0]
    return { ...user, password: userData.newPassword }
  }

  deleteUser(id: string) {
    this.fakeUsers = this.fakeUsers.filter(user => user.id !== id)
  }
}
