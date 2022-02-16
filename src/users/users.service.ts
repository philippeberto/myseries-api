import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPublic } from './dto/user';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: UserPublic) {
    const userDB = await this.userRepository.findOne(user.id);
    if (userDB) {
      throw new Error('User already exists.');
    }

    await this.userRepository.save(user);
    return true;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, ...newUser } = updateUserInput;
    console.log(newUser);
    let userToUpdate = await this.userRepository.findOne(id);
    if (!userToUpdate) {
      throw new Error('User not found.');
    }

    if (newUser.email) userToUpdate.email = newUser.email;
    if (newUser.name) userToUpdate.name = newUser.name;
    if (newUser.roles) userToUpdate.roles = newUser.roles;
    return this.userRepository.save(userToUpdate);
  }

  async remove(id: string): Promise<Boolean> {
    const deleted = await this.userRepository.delete(id);
    const result = deleted.affected == 0 ? false : true;
    if (!result) throw new Error('ID not correspond with any registry.');
    return result;
  }
}
