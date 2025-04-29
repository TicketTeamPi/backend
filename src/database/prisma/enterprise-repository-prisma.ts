import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Enterprise } from '../../enterprise/models/enterprise';
import { EnterpriseRepository } from '../repositories/enterprise-repository';

@Injectable()
export class EnterpriseRepositoryPrisma implements EnterpriseRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(enterprise: Enterprise): Promise<Enterprise> {
    await this._prismaService.enterprise.create({
      data: {
        id: enterprise.id,
        created_at: enterprise.created_at,
        name: enterprise.name,
        cnpj: enterprise.cnpj,
        email: enterprise.email,
        phone: enterprise.phone,
      },
    });

    return enterprise;
  }
}
