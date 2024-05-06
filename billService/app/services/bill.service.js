const Bill = require("../models/bill.model");
const getRecords = require("../util/getRecords");
const rabbitMQ = require("../services/rabbitMQ");
const generateId = require("../util/generateId");
const { Op } = require("sequelize");
class BillService {
  async getAll() {
    const data = await Bill.findAll();
    const bills = getRecords(data);
    return bills;
  }

  async createBill(bill) {
    try {
      console.log(bill);
      const newBill = await Bill.create(bill);
      return newBill.bill_id;
    } catch (error) {
      console.log(error);
    }
  }

  async getBillActiveByTableId(tableId) {
    const billActive = await Bill.findOne({
      where: { table_id: tableId, bill_status: "inuse" },
    });
    return billActive.get();
  }

  async processBillPayment(billId) {
    const bill = await Bill.findByPk(billId);
    await bill.update({ bill_status: "paid", payment_at: new Date() });

    const connection = await rabbitMQ.connect();
    const channel = await rabbitMQ.createChannel(connection);

    const message = {
      tableId: bill.table_id,
      jobType: "updateTableStatus",
    };

    const exchange = "bill_exchange";
    const routingKey = "bill.paid";
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
  }

  async getBillPaymentByTableId(tableId) {
    const bill = await this.getBillActiveByTableId(tableId);
    const connection = await rabbitMQ.connect();
    const channel = await rabbitMQ.createChannel(connection);
    const replyQueue = await channel.assertQueue("", { exclusive: true });
    const replyFoodQueue = await channel.assertQueue("", { exclusive: true });

    const ticketQueue = "rpc_queue";
    const foodQueue = "rpc_queue_food";
    const correlationId = generateId();
    const billCorrelationId = generateId();

    const message = {
      buffet_ticket_id: bill.buffet_ticket_id,
      correlationId: correlationId,
      replyTo: replyQueue.queue,
      jobType: "getDataById",
    };

    channel.sendToQueue(ticketQueue, Buffer.from(JSON.stringify(message)), {
      correlationId: correlationId,
      replyTo: replyQueue.queue,
    });

    const rpcDataTicket = await new Promise((resolve, reject) => {
      channel.consume(replyQueue.queue, (msg) => {
        if (msg.properties.correlationId === correlationId) {
          const data = JSON.parse(msg.content);
          resolve(data);
        }
        channel.ack(msg);
      });
    });

    const billMessage = {
      bill_id: bill.bill_id,
      correlationId: billCorrelationId,
      replyTo: replyFoodQueue.queue,
      jobType: "getBillFoodDetailsByBillId",
    };

    channel.sendToQueue(foodQueue, Buffer.from(JSON.stringify(billMessage)), {
      correlationId: billCorrelationId,
      replyTo: replyFoodQueue.queue,
    });

    const rpcBillTicket = await new Promise((resolve, reject) => {
      channel.consume(replyFoodQueue.queue, (msg) => {
        if (msg.properties.correlationId === billCorrelationId) {
          const data = JSON.parse(msg.content);
          resolve(data);
        }
        channel.ack(msg);
        reject((error) => {
          console.log(error);
        });
      });
    });

    const updatedBill = {
      ...bill,
      bill_price:
        rpcDataTicket.buffet_ticket_price * bill.buffet_ticket_quantity,
      buffet_ticket_price: rpcDataTicket.buffet_ticket_price,
      buffet_ticket_name: rpcDataTicket.buffet_ticket_name,
      foods: [...rpcBillTicket],
    };

    return updatedBill;
  }

  async getRevunueBetween(startOfDay, endOfDay) {
    let bills = await Bill.findAll({
      where: {
        payment_at: {
          [Op.between]: [startOfDay, endOfDay],
        },
        bill_status: "paid",
      },
    });

  

    if (!bills) {
      return 0;
    }

    bills = getRecords(bills);

    const ticketQueue = "rpc_queue";

    const connection = await rabbitMQ.connect();
    const channel = await rabbitMQ.createChannel(connection);
    const replyQueue = await channel.assertQueue("", { exclusive: true });

    const correlationId = generateId();

    const message = {
      bills: bills,
      correlationId: correlationId,
      replyTo: replyQueue.queue,
      jobType: "getTotalBills",
    };

    channel.sendToQueue(ticketQueue, Buffer.from(JSON.stringify(message)), {
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
        reject((error) => {
          console.log(error);
        });
      });
    });

    return rpcData;
  }

  async changeTable(oldTableId, newTableId) {
    await Bill.update({table_id: newTableId}, {where: {table_id: oldTableId, payment_at: null}});
  }
}

module.exports = new BillService();
