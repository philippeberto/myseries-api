import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavoritePublic {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field(() => [String])
  favoritesList: string[];
}
