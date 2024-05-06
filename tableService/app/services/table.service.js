const Table = require("../models/table.model");
const Area = require("../models/area.model");
const getRecords = require("../util/getRecords");
const rabbitMQ = require("./rabbitMQ");
const ApiError = require("../api-error");
const generateCorrelationId = require("../util/generateId");
class TableService {
  async getAllTable() {
    const data = await Table.findAll({ where: { is_deleted: false } });
    const tables = getRecords(data);
    return tables;
  }

  async createTable(table) {
    const newTable = await Table.create(table);
    return newTable;
  }

  async getTableById(id) {
    const table = await Table.findByPk(id);
    return table.get();
  }

  async getTableAreaById(id) {
    const table = await Table.findByPk(id);
    const area = await Area.findByPk(table.area_id);
    return { area: area.get(), table: table.get() };
  }

  async updateTableById(tableId, payload) {
    await Table.update(payload, { where: { table_id: tableId } });
  }

  async deleteTableById(tableId) {
    await Table.update({ is_deleted: true }, { where: { table_id: tableId } });
  }

  async activeTable(tableId, payload) {
    let table = await Table.findByPk(tableId);
    if (table.status === "occupied") {
      throw new ApiError(400, "Bàn đang được sử dụng");
    }

    table.status = "occupied";
    table.save();
    const connection = await rabbitMQ.connect();
    const channel = await rabbitMQ.createChannel(connection);
    const correlationId = generateCorrelationId();
    const replyQueue = await channel.assertQueue("", { exclusive: true });
    const queue = "rpc_queue_bill";
    const message = {
      table_id: tableId,
      user_id: payload.user_id,
      buffet_ticket_id: payload.buffet_ticket_id,
      buffet_ticket_quantity: payload.quantity,
      correlationId: correlationId,
      replyTo: replyQueue.queue,
      jobType: "occupiedTable",
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      correlationId: correlationId,
      replyTo: replyQueue.queue,
    });

    const rpcData = await new Promise((resolve, reject) => {
      channel.consume(replyQueue.queue, (msg) => {
        if (msg.properties.correlationId === correlationId) {
          const data = JSON.parse(msg.content);
          resolve(data);
        }
        channel.ack(msg);
      });
    });

    return rpcData;
  }

  async unactiveTable(tableId) {
    await Table.update(
      { status: "available" },
      { where: { table_id: tableId } }
    );
  }

  async getTotalTableInsuse() {
    const countOccupied = await Table.count({
      where: {
        status: "occupied",
      },
    });

    const countAvailable = await Table.count({
      where: {
        status: "available",
      },
    });

    return { countAvailable, countOccupied };
  }

  async changeTable(currentTable, newTable) {
    await Table.update({ status: "available" }, {where: {table_id: currentTable}});
    await Table.update({ status: "occupied" }, {where: {table_id: newTable}});

    const connection = await rabbitMQ.connect();
    const channel = await rabbitMQ.createChannel(connection);

    const message = {
      oldTableId: currentTable,
      newTableId: newTable,
    }
    const routingKey = "table.changeTable";
    const exchange = "table_exchange";
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
  }
}

module.exports = new TableService();
