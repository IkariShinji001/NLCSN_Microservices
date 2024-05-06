const Area = require("../models/area.model");
const Table = require("../models/table.model");
const getRecords = require("../util/getRecords");

class AreaService {
  async getAllAreaByName(query) {
    const data = await Area.findAll({
      where: { area_name: query.area_name, is_deleted: false },
    });
    const areas = getRecords(data);
    return areas;
  }

  async getAllArea() {
    const data = await Area.findAll({
      where: { is_deleted: false },
    });
    const areas = getRecords(data);
    return areas;
  }

  async deleteAreaById(areaId) {
    await Area.update({ is_deleted: true }, { where: { area_id: areaId } });
    await Table.update({ is_deleted: true }, { where: { area_id: areaId } });
  }

  async createArea(area) {
    const newArea = await Area.create(area);
    return newArea;
  }

  async updateAreaById(areaId, payload) {
    await Area.update(payload, { where: { area_id: areaId } });
  }

  async getAreaById(id) {
    const data = await Area.findByPk(id);
    return data.get();
  }

  async getTablesByAreaId(areaId) {
    const data = await Area.findOne({
      where: { area_id: areaId },
      include: {
        model: Table,
        where: { is_deleted: false },
      },
    });
    if (data) {
      return data.get();
    }
    const area = await Area.findOne({
      where: { area_id: areaId },
    });
    return area.get();
  }

  async getTablesAvailableByAreaId(areaId) {
    const data = await Area.findOne({
      where: { area_id: areaId },
      include: {
        model: Table,
        where: { is_deleted: false, status: "available" },
      },
    });
    if (data) {
      return data.get();
    }
    return [];
  }
}

module.exports = new AreaService();
