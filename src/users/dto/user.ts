import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserPublic {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [String])
  roles: string[];

  @Field()
  createdAt: Date;
}
