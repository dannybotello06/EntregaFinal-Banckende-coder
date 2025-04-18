
import TicketDao from "../services/daos/ticketDao.js";
export default class TicketRepository {
    ticketDao = new TicketDao();

    async getTicketById(ticketId) {
        return await this.ticketDao.getById(ticketId);
    }
    async getAllTickets() {
        return await this.ticketDao.getAll();
    }
    async createTicket(ticketData) {
        return await this.ticketDao.create(ticketData);
    }
    async updateTicket(ticketId, ticketData) {
        return await this.ticketDao.update(ticketId, ticketData);
    }
    async deleteTicket(ticketId) {
        return await this.ticketDao.delete(ticketId);
    }
}