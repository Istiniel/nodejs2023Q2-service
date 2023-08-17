import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  getUsers() {
    const users = this.userRepository.find()
    return users
  }

  async createUser(userData: CreateUserDto) {
    const hash = await bcrypt.hash(userData.password, +configService.get('CRYPT_SALT'));

    const newUser = this.userRepository.create({...userData, password: hash})
    return await this.userRepository.save(newUser)
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } })
    return user
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } })
    return user
  }

  async updatePassword(user: UserEntity, newPassword: string) {
    const password = await bcrypt.hash(newPassword, +configService.get('CRYPT_SALT'));

    await this.userRepository.save({ ...user, password })
    const updatedUser = await this.userRepository.findOne({ where: { id: user.id } })

    return updatedUser
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id)
  }
}
