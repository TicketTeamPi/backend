import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';
import { EnterpriseController } from './enterprise/controller/enterprise.controller';
import { EnterpriseRepositoryPrisma } from './database/prisma/enterprise-repository-prisma';
import { EnterpriseService } from './enterprise/services/enterprise.service';
import { EnterpriseRepository } from './database/repositories/enterprise-repository';
import { UserRepository } from './database/repositories/user-repository';
import { UserRepositoryMemory } from './database/memory/user-repository-memory';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: EnterpriseRepository,
      useClass: EnterpriseRepositoryPrisma,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryMemory,
    },
    EnterpriseService,
  ],
  controllers: [EnterpriseController],
})
export class AppModule {}
