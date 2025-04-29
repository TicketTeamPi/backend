import { Body, Controller, Post } from '@nestjs/common';
import { EnterpriseDto } from './dtos/input/enterprise.dto';
import { EnterpriseService } from './enterprise.service';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly _enterpriseService: EnterpriseService) {}

  @Post()
  async store(@Body() body: EnterpriseDto) {
    return this._enterpriseService.create(body);
  }
}
