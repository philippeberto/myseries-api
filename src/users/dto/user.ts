import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserPublic {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  createdAt: Date;
}
