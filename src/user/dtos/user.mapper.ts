import { User } from '../models/user';
import { UserDto } from './input/user.dto';
import { UserResponseDto } from './output/userResponse.dto';
import { UserBdDto } from './input/user.bd.dto';

export class UserMapper {
  static toUserResponseDto(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      enterpriseId: user.enterpriseId,
    });
  }

  static toUser(
    dto: UserDto,
    enterpriseId: string,
    password: string,
  ): User {
    return new User(dto.name, dto.email, password, dto.sector, enterpriseId);
  }

  static toUserfromBdDto(user: UserBdDto): User {
    return new User(
      user.name,
      user.email,
      user.password,
      user.enterpriseId,
      user.id,
      user.refreshToken,
    );
  }
}
