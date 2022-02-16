import { CreateStatusInput } from './dto/create-status.input';
import { Status } from './entities/status.entity';

export class StatusMapper {
  public static createToEntity(
    input: CreateStatusInput,
    userId: string,
  ): Status {
    const entity = new Status();
    entity.value = input.value;
    entity.userId = userId;
    entity.imdbId = input.imdbId;
    return entity;
  }
}
