import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly _prismaService: PrismaService) {}

  @Post()
  async store(@Body() body: any) {
    const {
      name,
      cnpj,
      email,
      phone,
      address 
    } = body;

    const enterprise = await this._prismaService.enterprise.create({
      data: {
        name,
        cnpj,
        email,
        phone,
        address: {
          create: {
            street: address.street,
          },
        },
      },
      include: {
        address: true,
      },
    });

    return enterprise;
  }
}
