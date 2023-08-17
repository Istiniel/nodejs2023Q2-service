import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  getUsers() {
    const users = this.userRepository.find()
    return users
  }

  createUser(userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData)
    return this.userRepository.save(newUser)
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } })
    return user
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } })
    return user
  }


  async updatePassword(user: UserEntity, password: string) {
    await this.userRepository.save({ ...user, password })
    const updatedUser = await this.userRepository.findOne({ where: { id: user.id } })

    return updatedUser
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id)
  }
}
