import { MongoMemoryServerGetStartOptions } from 'mongodb-memory-server-core/lib/MongoMemoryServer';
import mongoose from 'mongoose'

interface TicketAttrs{
    title: string;
    userId: string;
    price: number
}

interface TicketDoc extends mongoose.Document{
    title: string;
    price: number;
    userId: string
}

interface TicketModal extends mongoose.Model<TicketDoc>{
    build(attrs:TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
},{
    toJSON:{
        transform(doc , ret){
            ret.id = ret._id
            delete ret._id
        }
    }
})

ticketSchema.statics.build = (attrs: TicketAttrs)=>{
    return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDoc, TicketModal>('Ticket', ticketSchema)

export { Ticket }