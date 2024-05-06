const BuffetTicket = require("../models/buffetTicket.model");
const { Op } = require("sequelize");
const getRecords = require("../util/getRecords");
const rabbitMQ = require("./rabbitMQ");
const ApiError = require("../api-error");
const cloudinaryService = require("./cloudinary.service");

class BuffetTicketService {
  async createBuffetTicket(payload) {
    const newTicket = await BuffetTicket.create(payload);
    return newTicket;
  }

  async getAllBuffetTicket() {
    const tickets = await BuffetTicket.findAll({
      where: { is_deleted: false },
    });
    return getRecords(tickets);
  }

  async getBuffetTicketByName(query) {
    const tickets = await BuffetTicket.findAll({
      where: {
        buffet_ticket_name: {
          [Op.like]: `%${query}%`,
        },
        is_deleted: false,
      },
    });
    console.log(tickets);
    return tickets;
  }

  async updateBuffetTicket(id, payload) {
    if (payload.buffet_ticket_img) {
      const ticket = await BuffetTicket.findByPk(id);
      const publicId = cloudinaryService.getImageIdFromSecureUrl(
        ticket.buffet_ticket_img
      );
      await cloudinaryService.deleteCloudinaryImage(publicId);
    }
    await BuffetTicket.update(payload, { where: { buffet_ticket_id: id } });
    const updatedTicket = await BuffetTicket.findByPk(id);
    return updatedTicket;
  }

  async getBuffetTicketById(buffetTicketId) {
    const buffetTicket = await BuffetTicket.findOne({
      where: { buffet_ticket_id: buffetTicketId },
    });
    return buffetTicket;
  }

  async deleteBuffetTicket(id) {
    const buffetTicket = await BuffetTicket.findOne({
      where: { buffet_ticket_id: id },
    });

    await cloudinaryService.deleteCloudinaryImage(
      cloudinaryService.getImageIdFromSecureUrl(buffetTicket.buffet_ticket_img)
    );

    buffetTicket.is_deleted = true;

    await buffetTicket.save();
  }

  async getTotalBills(bills){
    try {
      let total = 0;
      for(let i = 0; i < bills.length; i++) {
        const ticket = await BuffetTicket.findByPk(bills[i].buffet_ticket_id);
        console.log(ticket.buffet_ticket_price);
        total = total + ticket.buffet_ticket_price * bills[i].buffet_ticket_quantity;
      }
      return total;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BuffetTicketService();
