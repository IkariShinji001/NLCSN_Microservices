const AreaService = require("../services/area.service");

class AreaController {
  async getAll(req, res, next) {
    const query = req.query;
    try {
      if (query.area_name) {
        const areas = await AreaService.getAllAreaByName(query);
        return res.status(200).json(areas);
      }
      const areas = await AreaService.getAllArea();
      return res.status(200).json(areas);
    } catch (error) {
      next(error);
    }
  }

  async createArea(req, res, next) {
    const area = req.body;
    try {
      const newArea = await AreaService.createArea(area);
      return res.status(200).json(newArea);
    } catch (error) {
      next(error);
    }
  }

  async deleteAreaById(req, res, next) {
    const areaId = req.params.id;
    try {
      await AreaService.deleteAreaById(areaId);
      return res.status(200).json({ message: "Xóa khu vực thành công" });
    } catch (error) {
      next(error);
    }
  }

  async updateAreaById(req, res, next) {
    const areaId = req.params.id;
    const payload = req.body;
    try {
      await AreaService.updateAreaById(areaId, payload);
      return res
        .status(200)
        .json({ message: "Cập nhật thông tin khu vực thành công" });
    } catch (error) {
      next(error);
    }
  }

  async getAllTableByAreaId(req, res, next) {
    const areaId = req.params.id;

    try {
      const tables = await AreaService.getTablesByAreaId(areaId);
      return res.status(200).json(tables);
    } catch (error) {
      next(error);
    }
  }

  async getAvailableTablesByAreaId(req, res, next) {
    const areaId = req.params.id;
    try {
      const tables = await AreaService.getTablesAvailableByAreaId(areaId);
      return res.status(200).json(tables);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new AreaController();
