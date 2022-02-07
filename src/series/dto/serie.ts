import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Serie')
export class SeriePublic {
  @Field()
  id: string;

  @Field()
  name: string;
}
