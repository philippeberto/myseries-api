import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPublic } from './dto/user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { AuthenticatedUser } from 'src/auth/authenticated-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserPublic)
  async createUser(@AuthenticatedUser() user): Promise<UserPublic> {
    return await this.usersService.create(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserPublic])
  findAllUsers(@AuthenticatedUser() user) {
    return this.usersService.findAll();
  }

  @Query(() => UserPublic)
  findUser(@Args('id', { type: () => String }) id: string) {
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
