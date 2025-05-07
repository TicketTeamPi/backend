import { User } from 'src/user/models/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract findById(id: string): Promise<User | undefined>;
}
