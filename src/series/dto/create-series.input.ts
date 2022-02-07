import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeriesInput {
  @Field()
  name: string;
}
