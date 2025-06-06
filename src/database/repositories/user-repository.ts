import { UserBdDto } from '../../user/dtos/input/user.bd.dto';
import { UserDto } from '../../user/dtos/input/user.dto';
import { User } from '../../user/models/user';

export abstract class UserRepository {
  abstract create(user: UserDto): Promise<User>;
  abstract findByEmail(email: string): Promise<UserBdDto | undefined>;
  abstract update(user: UserBdDto): Promise<void>;
  abstract findById(id: string): Promise<UserBdDto | undefined>;
  abstract findAll(): Promise<UserBdDto[]>;
}
