import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPublic } from './dto/user';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserPublic)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<UserPublic> {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [UserPublic], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserPublic, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserPublic)
  updateUser(@Args('input') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.remove(id);
  }
}
