import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {
  @Field()
  id: string;

  @Field()
  text: string;
}
