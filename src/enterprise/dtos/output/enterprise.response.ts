export class EnterpriseResponse {
  readonly id: string;
  readonly name: string;
  readonly cnpj: string;
  readonly email?: string;
  readonly phone?: string;
  readonly role?: string;
  constructor(props: {
    id: string;
    name: string;
    cnpj: string;
    email?: string;
    phone?: string;
    role?: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.cnpj = props.cnpj;
    this.email = props.email;
    this.phone = props.phone;
    this.role = props.role;
  }
}
