const TableService = require("../services/table.service");

class TableController {
  async getAll(req, res, next) {
    try {
      const tables = await TableService.getAllTable();
      return res.status(200).json(tables);
    } catch (error) {
      console.log(error);
    }
  }

  async getTableById(req, res, next) {
    try {
      const table = await TableService.getTableById(req.params.id);
      return res.status(200).json(table);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getTableAreaById(req, res, next) {
    try {
      const table = await TableService.getTableAreaById(req.params.id);
      return res.status(200).json(table);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createTable(req, res, next) {
    const table = req.body;
    try {
      const newTable = await TableService.createTable(table);
      return res.status(200).json(newTable);
    } catch (error) {
      next(error);
    }
  }

  async updateTableById(req, res, next) {
    const tableId = req.params.id;
    const payload = req.body;
    try {
      await TableService.updateTableById(tableId, payload);
      return res
        .status(200)
        .json({ message: "Cập nhật thông tin bàn thành công" });
    } catch (error) {
      next(error);
    }
  }

  async activeTable(req, res, next) {
    const tableId = req.params.id;
    const payload = req.body;
    console.log("active table");

    try {
      const bill_id = await TableService.activeTable(tableId, payload);
      return res.status(200).json(bill_id);
    } catch (error) {
      next(error);
    }
  }

  async deleteTableById(req, res, next) {
    const id = req.params.id;
    try {
      await TableService.deleteTableById(id);
      return res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  }

  async getTotalTableInsuse(req, res, next) {
    try {
      const count = await TableService.getTotalTableInsuse();
      return res.status(200).json(count);
    } catch (error) {
      next(error)
    }
  }

  async changeTable(req, res, next) {
    try {
      const currentTable = req.params.id;
      const newTable = req.body.tableId;
      await TableService.changeTable(currentTable, newTable);
      return res.status(200).json("Chuyển bàn thành công!");
    } catch (error) {
      next(error)
    }
  }

  
}

module.exports = new TableController();
