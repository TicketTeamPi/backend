import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EnterpriseDto } from '../dtos/input/enterprise.dto';
import { EnterpriseService } from '../services/enterprise.service';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly _enterpriseService: EnterpriseService) {}

  @Post()
  async store(@Body() body: EnterpriseDto) {
    return this._enterpriseService.create(body);
  }
}
