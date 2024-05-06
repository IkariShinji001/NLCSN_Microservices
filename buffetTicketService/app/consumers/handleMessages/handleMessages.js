const BuffetTicketService = require("../../services/buffetTicket.service");
class HandleMessages {
  async getDataById(id) {
    const buffetTicket = await BuffetTicketService.getBuffetTicketById(id);
    return buffetTicket;
  }

  async getTotalBills(bills){
    const total = await BuffetTicketService.getTotalBills(bills.bills);
    return total;
  }
}

module.exports = new HandleMessages();
