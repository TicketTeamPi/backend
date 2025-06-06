import { BaseEntity } from 'src/shared/base-entity';

export class User extends BaseEntity {
  private readonly _name: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _sector: string;
  private readonly _enterpriseId: string;
  private readonly _refreshTokenId?: string;

  constructor(
    name: string,
    email: string,
    password: string,
    sector: string,
    enterpriseId: string,
    refreshToken?: string,
  ) {
    super();
    this._name = name;
    this._email = email;
    this._password = password;
    this._sector = sector;
    this._enterpriseId = enterpriseId;
    this._refreshTokenId = refreshToken;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get sector(): string {
    return this._sector;
  }

  get enterpriseId(): string {
    return this._enterpriseId;
  }

  get refreshToken(): string | undefined {
    return this._refreshTokenId;
  }
}
