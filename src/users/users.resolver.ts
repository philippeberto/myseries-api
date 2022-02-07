import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPublic } from './dto/user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { AuthenticatedUser } from 'src/auth/authenticated-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserPublic)
  createUser(@AuthenticatedUser() user): Promise<UserPublic> {
    return this.usersService.create(user);
  }

  @UseGuards(GqlAuthGuard, RoleGuard)
  @Query(() => [UserPublic])
  findAllUsers(@AuthenticatedUser() user) {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserPublic)
  findUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserPublic)
  updateUser(@Args('input') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Role('admin')
  @UseGuards(GqlAuthGuard, RoleGuard)
  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
