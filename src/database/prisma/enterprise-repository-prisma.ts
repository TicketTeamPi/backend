import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Enterprise } from '../../enterprise/models/enterprise';
import { EnterpriseRepository } from '../repositories/enterprise-repository';

@Injectable()
export class EnterpriseRepositoryPrisma implements EnterpriseRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async findByCnpj(email: string): Promise<Enterprise | undefined> {
    const enterprise = await this._prismaService.enterprise.findFirst({
      where: {
        email,
      },
    });

    return enterprise
      ? new Enterprise(
          enterprise.name,
          enterprise.cnpj,
          enterprise.email,
          enterprise.phone? enterprise.phone : undefined,
        )
      : undefined;
  }

  async create(enterprise: Enterprise): Promise<Enterprise> {
    await this._prismaService.enterprise.create({
      data: {
        id: enterprise.id,
        name: enterprise.name,  
        cnpj: enterprise.cnpj,
        phone: enterprise.phone,
        created_at: enterprise.created_at,
        email: enterprise.email,
      },
    });

    return enterprise;
  }
}
