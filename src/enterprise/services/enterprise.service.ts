import { Injectable } from '@nestjs/common';
import { EnterpriseDto } from '../dtos/input/enterprise.dto';
import { EnterpriseResponse } from '../dtos/output/enterprise.response';
import { EnterpriseMapper } from '../dtos/enterprise.mapper';
import { EnterpriseRepository } from '../../database/repositories/enterprise-repository';
import { UserRepository } from 'src/database/repositories/user-repository';
import { User } from 'src/user/models/user';

@Injectable()
export class EnterpriseService {
  constructor(
    private readonly _enterpriseRepository: EnterpriseRepository,
    private readonly _userRepository: UserRepository,
  ) {}

  async create(enterpriseDto: EnterpriseDto): Promise<EnterpriseResponse> {
    const cnpjIsAlreadyInUse = await this._enterpriseRepository.findByCnpj(
      enterpriseDto.cnpj,
    );

    if (cnpjIsAlreadyInUse) {
      throw new Error('já existe uma empresa com esse cnpj.');
    }

    const enterprise = EnterpriseMapper.toEnterprise(enterpriseDto);

    await this._enterpriseRepository.create(enterprise);

    const user = await this._userRepository.create(
      new User(
        enterprise.name,
        enterprise.email,
        enterpriseDto.password,
        'ADMIN',
        enterprise.id,
      ),
    );

    await this._enterpriseRepository.updateUserId(enterprise.id, user.id);

    return EnterpriseMapper.toEnterpriseResponse(enterprise);
  }
}
