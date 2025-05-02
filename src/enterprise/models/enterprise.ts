import { BaseEntity } from '../../shared/base-entity';

export class Enterprise extends BaseEntity {
  private readonly _name: string;
  private readonly _cnpj: string;
  private readonly _email?: string;
  private readonly _phone?: string;

  constructor(name: string, cnpj: string, email?: string, phone?: string) {
    super();
    this._name = name;
    this._cnpj = cnpj;
    this._email = email;
    this._phone = phone;
  }

  get name(): string {
    return this._name;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  get email(): string | undefined {
    return this._email;
  }

  get phone(): string | undefined {
    return this._phone;
  }
}
