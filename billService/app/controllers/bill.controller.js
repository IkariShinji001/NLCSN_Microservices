const billService = require("../services/bill.service");
const BillService = require("../services/bill.service");

class BillController {
  async getAll(req, res, next) {
    try {
      const bill = await BillService.getAll();
      return res.status(200).json(bill);
    } catch (error) {
      next(error);
    }
  }
  async getBilInuseByTableId(req, res, next) {
    const tableId = req.params.id;
    try {
      const bill = await BillService.getBillActiveByTableId(tableId);
      return res.status(200).json(bill);
    } catch (error) {
      next(error);
    }
  }

  async getBillFoodByTableId(req, res, next) {
    const tableId = req.params.id;
    try {
      const data = await BillService.getBillPaymentByTableId(tableId);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async processBillPayment(req, res, next) {
    try {
      await billService.processBillPayment(req.params.id);
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  }

  async getBillRevenueToday(req, res, next) {
    try {
      const currentDate = new Date();
      const startOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const endOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );

      const revenue = await billService.getRevunueBetween(startOfDay, endOfDay);
      return res.status(200).json(revenue);
    } catch (error) {
      next(error);
    }
  }
  
  async getBillRevenueStartToEnd(req, res, next) {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    try {
      const revenue = await billService.getRevunueBetween(startDate, endDate);
      return res.status(200).json(revenue);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BillController();
