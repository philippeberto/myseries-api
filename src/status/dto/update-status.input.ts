import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { StatusType } from '../entities/status.entity';

@InputType()
export class UpdateStatusInput {
  @Field()
  id: string;

  @Field()
  value: StatusType;
}
