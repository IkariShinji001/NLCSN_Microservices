const billDishSauceDetail = require("../models/billDishSauceDetail.model");
const getRecords = require("../util/getRecords");
const generateId = require("../util/generateId");
const rabbitMQ = require("./rabbitMQ");
const Dish = require("../models/dish.model");
const Sauce = require("../models/sauce.model");
const Sequelize = require("sequelize");

class BuffetTicketDishSauceDetailService {
  async createBillDishSauceDetail(payload) {
    for (let i = 0; i < payload.foodDetail.length; i++) {
      const food = payload.foodDetail[i];
      const existingData = await billDishSauceDetail.findOne({
        where: {
          bill_id: payload.billId,
          dish_id: food.dish_id,
          sauce_id: food.sauce_id,
        },
      });

      if (existingData) {
        console.log(
          "new quantity" +
            parseInt(existingData.quantity) +
            parseInt(food.quantity)
        );
        await existingData.update({
          quantity: parseInt(existingData.quantity) + parseInt(food.quantity),
        });
      } else {
        await billDishSauceDetail.create({
          bill_id: payload.billId,
          dish_id: food.dish_id,
          sauce_id: food.sauce_id,
          quantity: food.quantity,
        });
      }
    }
    const connection = await rabbitMQ.connect();
    const channel = await rabbitMQ.createChannel(connection);
    const replyQueue = await channel.assertQueue("", { exclusive: true });

    const queue = "rpc_queue_table";
    const correlationId = generateId();
    const message = {
      table_id: payload.tableId,
      correlationId: correlationId,
      replyTo: replyQueue.queue,
      jobType: "getDataById",
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

    payload = {
      ...payload,
      ...rpcData,
    };

    global.io.emit("billDishSauceDetail", payload);
  }

  async getAllBillDishSauceDetail() {
    const billDetail = await billDishSauceDetail.findAll();
    return getRecords(billDetail);
  }

  async getBillFoodDetailsByBillId(billId) {
    const billDetail = await billDishSauceDetail.findAll({
      where: { bill_id: billId },
      include: [{ model: Dish }, { model: Sauce }],
    });
    return getRecords(billDetail);
  }

  async getBillFoodDetails() {
    const food = await billDishSauceDetail.findAll({
      include: [
        { model: Dish, as: "dish" },
        { model: Sauce, as: "sauce" },
      ],
      group: ["dish.dish_id", "sauce.sauce_id"],
      attributes: [
        [Sequelize.col("dish.dish_id"), "dish_id"],
        [Sequelize.col("sauce.sauce_id"), "sauce_id"],
        [Sequelize.col("dish.dish_name"), "dish_name"], 
        [Sequelize.col("dish.dish_img"), "dish_img"],
        [Sequelize.col("sauce.sauce_name"), "sauce_name"], 
        [Sequelize.fn("sum", Sequelize.col("quantity")), "total_quantity"], // Calculate total quantity
      ],
      order: [[Sequelize.col("total_quantity"), "DESC"]],
    });

    return getRecords(food);
  }
}

module.exports = new BuffetTicketDishSauceDetailService();
