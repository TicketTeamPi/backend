import { Injectable } from '@nestjs/common';
import { Ticket } from '../../ticket/models/ticket';
import { TicketRepository } from '../repositories/ticket-repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class TicketRepositoryPrisma implements TicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(ticket: Ticket): Promise<Ticket> {
    await this.prisma.ticket.create({
      data: {
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        responsible_id: ticket.responsibleId,
      },
    });

    return ticket;
  }

  async findById(id: string): Promise<Ticket | null> {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id },
    });
    console.log(ticket);
    if (!ticket) {
      return Promise.resolve(null);
    }

    return new Ticket(
      ticket.title,
      ticket.description,
      ticket.status,
      ticket.responsible_id,
      ticket.id,
    );
  }

  async findByResponsibleId(responsibleId: string): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: { responsible_id: responsibleId },
    });

    return tickets.map(
      (ticket) =>
        new Ticket(
          ticket.title,
          ticket.description,
          ticket.status,
          ticket.responsible_id,
          ticket.id,
        ),
    );
  }

  async update(ticket: Ticket, id: string): Promise<void> {
    await this.prisma.ticket.update({
      where: { id: id },
      data: {
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        responsible_id: ticket.responsibleId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.ticket.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Ticket[]> {
    const tickets = await this.prisma.ticket.findMany();

    return tickets.map(
      (ticket) =>
        new Ticket(
          ticket.title,
          ticket.description,
          ticket.status,
          ticket.responsible_id,
          ticket.id,
        ),
    );
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.prisma.ticket.update({
      where: { id },
      data: { status },
    });
  }
}
