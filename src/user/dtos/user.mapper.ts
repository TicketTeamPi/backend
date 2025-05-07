import { Role, User } from '../models/user';
import { UserDto } from './input/user.dto';
import { UserResponse } from './output/user.response';

export class UserMapper {
  static toUser(userDto: UserDto, password: string, role: Role): User {
    return new User(userDto.name, userDto.email, password, role);
  }

  static toUserReponse(user: User): UserResponse {
    return new UserResponse(user.id, user.name, user.email, user.role);
  }
}
