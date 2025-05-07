import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from '../services/enterprise.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { EnterpriseRepository } from '../../database/repositories/enterprise-repository';
import { EnterpriseRepositoryMemory } from '../../database/memory/enterprise-repository-memory';

describe('EnterpriseController', () => {
  let controller: EnterpriseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterpriseController],
      providers: [
        PrismaService,
        EnterpriseService,
        {
          provide: EnterpriseRepository,
          useClass: EnterpriseRepositoryMemory,
        },
      ],
    }).compile();

    controller = module.get<EnterpriseController>(EnterpriseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
