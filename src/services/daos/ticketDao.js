import TicketModel from "../models/ticket.model.js";


export default class TicketDao {
  async getById(ticketId) {
    console.log("Fetching ticket by ID:", ticketId);
    return await TicketModel.findById(ticketId);
  }

  async getAll() {
    return await TicketModel.find();
  }

  async create(ticketData) {
    const ticket = new TicketModel(ticketData);
    return await ticket.save();
  }

  async update(ticketId, ticketData) {
    return await TicketModel.findByIdAndUpdate(ticketId, ticketData, { new: true });
  }

  async delete(ticketId) {
    return await TicketModel.findByIdAndDelete(ticketId);
  }
}