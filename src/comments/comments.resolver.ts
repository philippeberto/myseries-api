import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CommentPublic } from './dto/comment';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';
import { AuthenticatedUser } from 'src/auth/authenticated-user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommentPublic)
  createComment(
    @Args('input') createCommentInput: CreateCommentInput,
    @AuthenticatedUser() user,
  ) {
    return this.commentsService.create(createCommentInput, user.id);
  }

  @Query(() => [CommentPublic])
  findAllCommentByTitle(@Args('title', { type: () => String }) imdbIf: string) {
    return this.commentsService.findAll(imdbIf);
  }

  @Query(() => CommentPublic)
  findOneComment(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Boolean)
  updateComment(@Args('input') updateCommentInput: UpdateCommentInput) {
    return this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput.text,
    );
  }

  @Mutation(() => CommentPublic)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.remove(id);
  }
}
