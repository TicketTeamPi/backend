import { Enterprise } from '../../enterprise/models/enterprise';
import { EnterpriseRepository } from '../repositories/enterprise-repository';

export class EnterpriseRepositoryMemory implements EnterpriseRepository {
  private readonly enterprises: Enterprise[] = [];

  async findByCnpj(cnpj: string): Promise<Enterprise | undefined> {
    return this.enterprises.find((e) => e.cnpj === cnpj);
  }

  async create(enterprise: Enterprise): Promise<Enterprise> {
    this.enterprises.push(enterprise);

    return enterprise;
  }

  async updateUserId(id: string, userId: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
