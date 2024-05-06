const BillService = require("../../services/bill.service");

class handleMQ {
  async createBill(bill) {
    const billId = await BillService.createBill(bill);
    return billId;
  }
  async changeTable(oldTableId, newTableId) {
    
  }
}

module.exports = new handleMQ();
