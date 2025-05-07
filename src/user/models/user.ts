import { BaseEntity } from 'src/shared/base-entity';
import * as bcrypt from 'bcrypt';

export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type Role = (typeof UserRole)[keyof typeof UserRole];

export class User extends BaseEntity {
  private readonly _name: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _role: Role;

  constructor(name: string, email: string, password: string, role: Role) {
    super();
    this._name = name;
    this._email = email;
    this._password = bcrypt.hashSync(password, 8);
    this._role = role;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get role() {
    return this._role;
  }
}
