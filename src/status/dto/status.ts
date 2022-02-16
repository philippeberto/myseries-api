import { ObjectType, Field } from '@nestjs/graphql';
import { StatusType } from '../entities/status.entity';

@ObjectType('Status')
export class StatusPublic {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  imdbId: string;

  @Field()
  value: StatusType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
