import { User } from 'src/user/models/user';
import { UserRepository } from '../repositories/user-repository';

export class UserRepositoryMemory implements UserRepository {
  private readonly users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((e) => e.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((e) => e.id === id);
  }
}
