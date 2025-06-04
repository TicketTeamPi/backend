import { Ticket } from "src/ticket/models/ticket";


export abstract class TicketRepository {
    abstract create(ticket: Ticket): Promise<Ticket>;
    abstract findById(id: string): Promise<Ticket | null>;
    abstract findByResponsibleId(responsibleId: string): Promise<Ticket[]>;
    abstract update(ticket: Ticket): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findAll(): Promise<Ticket[]>;
    abstract updateStatus(id: string, status: string): Promise<void>;
}