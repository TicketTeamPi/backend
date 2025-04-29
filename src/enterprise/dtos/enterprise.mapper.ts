import { Enterprise } from '../models/enterprise';
import { EnterpriseDto } from './input/enterprise.dto';
import { EnterpriseResponse } from './output/enterprise.response';

export class EnterpriseMapper {
  static toEnterpriseResponse(enterprise: Enterprise): EnterpriseResponse {
    return new EnterpriseResponse({
      id: enterprise.id,
      name: enterprise.name,
      cnpj: enterprise.cnpj,
      email: enterprise.email,
      phone: enterprise.phone,
    });
  }

  static toEnterprise(enterpriseDto: EnterpriseDto): Enterprise {
    return new Enterprise(
      enterpriseDto.name,
      enterpriseDto.cnpj,
      enterpriseDto.email,
    );
  }
}
