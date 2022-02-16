import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  imdbId: string;

  @Field()
  text: string;
}
