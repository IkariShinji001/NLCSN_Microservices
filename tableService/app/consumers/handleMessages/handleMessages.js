const tableService = require("../../services/table.service")
class HandleMessages {
  async getDataById(id) {
    const tableAndArea = await tableService.getTableAreaById(id);
    return tableAndArea;
  }

  async updateTableStatus(message){
    await tableService.unactiveTable(message.tableId);
  }
}

module.exports = new HandleMessages();
