import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';

export class CommentMapper {
  public static createToEntity(input: CreateCommentInput, id: string): Comment {
    const entity = new Comment();
    entity.text = input.text;
    entity.userId = id;
    entity.imdbId = input.imdbId;
    return entity;
  }
}
