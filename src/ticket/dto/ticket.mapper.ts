import { Ticket } from "../models/ticket";
import { TicketDto } from "./input/tickect.dto";
import { TicketResponse } from "./output/ticket.response";

export class TicketMapper {
    static toTicket(ticketDto: TicketDto): Ticket {
        return new Ticket(ticketDto.title, ticketDto.description, ticketDto.status, ticketDto.responsibleId);
    }

    static toTicketResponse(ticket: Ticket): TicketResponse {
        return {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            responsibleId: ticket.responsibleId,
        };
    }   
}