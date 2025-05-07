import { Enterprise } from '../../enterprise/models/enterprise';

export abstract class EnterpriseRepository {
  abstract create(enterprise: Enterprise): Promise<Enterprise>;
  abstract findByCnpj(cnpj: string): Promise<Enterprise | undefined>;
}
