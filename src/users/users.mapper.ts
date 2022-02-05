import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

export class UserMapper {
  public static toEntity(input: CreateUserInput): User {
    const entity = new User();
    entity.name = input.name;
    entity.email = input.email;
    return entity;
  }

  //   public static toUpdateEntity(input: UserUpdateInput): User {
  //     const entity = new User()
  //     entity.id = input.id
  //     entity.name = input.name
  //     entity.email = input.email
  //     entity.role = input.role
  //     entity.passwd = input.passwd
  //     return entity
  //   }
}
