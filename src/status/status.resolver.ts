import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatusService } from './status.service';
import { Status } from './entities/status.entity';
import { CreateStatusInput } from './dto/create-status.input';
import { UpdateStatusInput } from './dto/update-status.input';
import { StatusPublic } from './dto/status';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { AuthenticatedUser } from 'src/auth/authenticated-user.decorator';

@Resolver(() => Status)
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => StatusPublic)
  createStatus(
    @Args('input') createStatusInput: CreateStatusInput,
    @AuthenticatedUser() user,
  ) {
    return this.statusService.create(createStatusInput, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [StatusPublic])
  findStatusByImdbId(@Args('imdbId', { type: () => String }) imdbId: string) {
    return this.statusService.findAll(imdbId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => StatusPublic)
  findOneStatus(@Args('id', { type: () => Int }) id: number) {
    return this.statusService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  updateStatus(@Args('input') updateStatusInput: UpdateStatusInput) {
    return this.statusService.update(
      updateStatusInput.id,
      updateStatusInput.value,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeStatus(@Args('id', { type: () => Int }) id: number) {
    return this.statusService.remove(id);
  }
}
