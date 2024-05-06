const billDishSauceService = require("../../services/billDishSauceDetail.service");

class handleMQ {
  async getBillFoodDetailsByBillId(message) {
    try {
      const data = await billDishSauceService.getBillFoodDetailsByBillId(
        message.bill_id
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new handleMQ();
