import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Enterprise } from 'src/enterprise/models/enterprise';

@Injectable()
export class EnterpriseRepository {
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
