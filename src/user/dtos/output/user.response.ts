import { Role } from 'src/user/models/user';

export class UserResponse {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: Role;

  constructor(id: string, name: string, email: string, role: Role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
