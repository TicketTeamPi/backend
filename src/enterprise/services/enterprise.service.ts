import { Injectable } from '@nestjs/common';
import { EnterpriseDto } from '../dtos/input/enterprise.dto';
import { EnterpriseResponse } from '../dtos/output/enterprise.response';
import { EnterpriseMapper } from '../dtos/enterprise.mapper';
import { EnterpriseRepository } from '../../database/repositories/enterprise-repository';

@Injectable()
export class EnterpriseService {
  constructor(private readonly _enterpriseRepository: EnterpriseRepository) {}

  async create(enterpriseDto: EnterpriseDto): Promise<EnterpriseResponse> {
    const cnpjIsAlreadyInUse = await this._enterpriseRepository.findByCnpj(
      enterpriseDto.cnpj,
    );

    if (cnpjIsAlreadyInUse) {
      throw new Error('já existe uma empresa com esse cnpj.');
    }

    const enterprise = EnterpriseMapper.toEnterprise(enterpriseDto);

    await this._enterpriseRepository.create(enterprise);

    return EnterpriseMapper.toEnterpriseResponse(enterprise);
  }
}
