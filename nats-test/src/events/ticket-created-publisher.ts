import { TicketCreatedEvent } from './ticket-creted-event';
import { Publisher } from "./base-publisher";
import { Subjects } from './subjects';


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated= Subjects.TicketCreated;
}