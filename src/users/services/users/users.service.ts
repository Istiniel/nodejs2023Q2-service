import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/services/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import UpdatePasswordDto from '../../dtos/UpdatePassword.dto';

@Injectable()
export class UsersService {

  constructor(private dbService: DatabaseService) { }

  getUsers() {
    return this.dbService.getUsers()
  }

  createUser(userData: CreateUserDto) {
    const id = uuidv4();
    const date = new Date().getTime()
    const user = { ...userData, id, version: 1, createdAt: date, updatedAt: date };
    this.dbService.createUser({ ...user })
    delete user.password
    return user
  }

  getUser(id: string) {
    return this.dbService.getUser(id)
  }

  updatePassword(userData: UpdatePasswordDto, id: string) {
    const user = this.dbService.updatePassword({ ...userData }, id)
    delete user.password
    return user
  }

  deleteUser(id: string) {
    this.dbService.deleteUser(id)
  }
}
