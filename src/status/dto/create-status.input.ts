import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { StatusType } from '../entities/status.entity';

@InputType()
export class CreateStatusInput {
  @Field()
  imdbId: string;

  @Field()
  value: StatusType;
}
