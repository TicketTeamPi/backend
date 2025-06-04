import { BaseEntity } from '../../shared/base-entity';
import { User } from '../../user/models/user';

export class Enterprise extends BaseEntity {
  private readonly _name: string;
  private readonly _cnpj: string;
  private readonly _email: string;
  private readonly _phone?: string;
  private _adminId?: string;

  constructor(
    name: string,
    cnpj: string,
    email: string,
    phone?: string,
    adminId?: string,
    admin?: User,
    id?: string
  ) {
    super();
    this._name = name;
    this._cnpj = cnpj;
    this._phone = phone;
    this._email = email;
    this._adminId = adminId;
  }

  get name(): string {
    return this._name;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  get phone(): string | undefined {
    return this._phone;
  }
  
  get email(): string {
    return this._email;
  }

  get adminId(): string | undefined {
    return this._adminId;
  }
}
