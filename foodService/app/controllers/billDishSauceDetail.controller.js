const billDishSauceService = require("../services/billDishSauceDetail.service");

class BillDishSauceDetailController {
  async createBillDishSauce(req, res, next) {
    const payload = req.body;
    try {
      await billDishSauceService.createBillDishSauceDetail(payload);
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  }

  async getAllBillDishSauceDetail(req, res, next) {
    try {
      const data = await billDishSauceService.getAllBillDishSauceDetail();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getBillFoodDetails(req, res, next) {
    try {
      const data = await billDishSauceService.getBillFoodDetails();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = new BillDishSauceDetailController();
