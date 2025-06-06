import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { TicketDto } from '../dto/input/tickect.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly _ticketService: TicketService) {}

  @Post()
  async store(@Body() body: TicketDto) {
    return this._ticketService.create(body);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this._ticketService.findById(id);
  }

  @Get()
  async findAll() {
    return this._ticketService.findAll();
  }

  @Get('responsible/:responsibleId')
  async findByResponsibleId(@Param('responsibleId') responsibleId: string) {
    return this._ticketService.findByResponsibleId(responsibleId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: TicketDto) {
    return this._ticketService.update(id, body);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this._ticketService.updateStatus(id, status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this._ticketService.delete(id);
  }
}
