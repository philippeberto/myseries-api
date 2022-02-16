import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Comment')
export class CommentPublic {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  imdbId: string;

  @Field()
  text: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
