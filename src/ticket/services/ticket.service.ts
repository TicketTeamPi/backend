import { Injectable } from '@nestjs/common';
import { TicketRepository } from 'src/database/repositories/ticket-repository';
import { TicketDto } from '../dto/input/tickect.dto';
import { TicketMapper } from '../dto/ticket.mapper';
import { TicketResponse } from '../dto/output/ticket.response';

@Injectable()
export class TicketService {
  constructor(private readonly _ticketRepository: TicketRepository) {}

  async create(ticketDto: TicketDto): Promise<TicketResponse> {
    const ticket = TicketMapper.toTicket(ticketDto);

    await this._ticketRepository.create(ticket);

    return TicketMapper.toTicketResponse(ticket);
  }

  async findById(id: string): Promise<TicketResponse> {
    const ticket = await this._ticketRepository.findById(id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    return TicketMapper.toTicketResponse(ticket);
  }

  async findByResponsibleId(responsibleId: string): Promise<TicketResponse[]> {
    const tickets =
      await this._ticketRepository.findByResponsibleId(responsibleId);

    return tickets.map(TicketMapper.toTicketResponse);
  }

  async update(id: string, ticketDto: TicketDto): Promise<TicketResponse> {
    const ticket = TicketMapper.toTicket(ticketDto);

    await this._ticketRepository.update(ticket);

    return TicketMapper.toTicketResponse(ticket);
  }

  async delete(id: string): Promise<void> {
    await this._ticketRepository.delete(id);
  }

  async findAll(): Promise<TicketResponse[]> {
    const tickets = await this._ticketRepository.findAll();

    return tickets.map(TicketMapper.toTicketResponse);
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this._ticketRepository.updateStatus(id, status);
  }
}
