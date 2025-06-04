import { User } from '../models/user';
import { UserDto } from './input/user.dto';
import { UserResponseDto } from './output/userResponse.dto';

export class UserMapper {
  static toUserResponseDto(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      enterpriseId: user.enterpriseId,
    });
  }

  static toUser(dto: UserDto, enterpriseId: string, role: string): User {
    return new User(dto.name, dto.email, dto.password, role, enterpriseId);
  }
}
