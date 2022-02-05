import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    return await this.userRepository.save(UserMapper.toEntity(createUserInput));
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, ...newUser } = updateUserInput;
    console.log(newUser);
    let userToUpdate = new UpdateUserInput();
    try {
      userToUpdate = await this.userRepository.findOne(id);
    } catch (err) {
      console.log(err);
      throw new Error('User not found.');
    }
    if (newUser.email) userToUpdate.email = newUser.email;
    if (newUser.name) userToUpdate.name = newUser.name;
    return this.userRepository.save(userToUpdate);
  }

  async remove(id: string): Promise<Boolean> {
    const deleted = await this.userRepository.delete(id);
    const result = deleted.affected == 0 ? false : true;
    if (!result) throw new Error('ID not correspond with any registry.');
    return result;
  }
}
