import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';
import { EnterpriseController } from './enterprise/enterprise.controller';
import { EnterpriseRepository } from './database/prisma/repositories/enterprise-repository';
import { EnterpriseService } from './enterprise/enterprise.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    EnterpriseRepository,
    EnterpriseService
  ],
  controllers: [EnterpriseController],
})
export class AppModule {}
