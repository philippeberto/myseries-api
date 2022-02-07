import { UserPublic } from './dto/user';
import { User } from './entities/user.entity';

export class UserMapper {
  public static toEntity(input: UserPublic): User {
    const entity = new User();
    entity.id = input.id;
    entity.name = input.name;
    entity.email = input.email;
    entity.roles = input.roles;
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
