import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseRepository } from '../../database/repositories/enterprise-repository';
import { EnterpriseRepositoryMemory } from '../../database/memory/enterprise-repository-memory';
import { EnterpriseDto } from '../dtos/input/enterprise.dto';
import { EnterpriseResponse } from '../dtos/output/enterprise.response';
import { faker } from '@faker-js/faker';

describe('Services - EnterpriseService', () => {
  let service: EnterpriseService;
  let repository: EnterpriseRepositoryMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnterpriseService,
        {
          provide: EnterpriseRepository,
          useClass: EnterpriseRepositoryMemory,
        },
      ],
    }).compile();

    service = module.get<EnterpriseService>(EnterpriseService);
    repository = module.get<EnterpriseRepositoryMemory>(EnterpriseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an enterprise and return the response', async () => {
    const enterpriseDto: EnterpriseDto = {
      name: faker.internet.username(),
      cnpj: faker.string.numeric({length: 14}),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    };

    const result: EnterpriseResponse = await service.create(enterpriseDto);
    console.log(result)
    expect(result).toBeDefined();
    expect(result.name).toBe(enterpriseDto.name);
    expect(result.email).toBe(enterpriseDto.email);
    expect(result.cnpj).toBe(enterpriseDto.cnpj);
    expect(result.phone).toBe(enterpriseDto.phone);
  });
});
