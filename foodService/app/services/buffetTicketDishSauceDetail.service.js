const BuffetTicketDishSauce = require("../models/buffetTicketDishSauceDetail.model");
const Dish = require("../models/dish.model");
const Sauce = require("../models/sauce.model");
const getRecords = require("../util/getRecords");
const generateCorrelationId = require("../util/generateId");
const rabbitMQ = require("./rabbitMQ");

class BuffetTicketDishSauceDetailService {
  async getAllTicketDishSauce() {
    const ticketDishSauceDetails = await BuffetTicketDishSauce.findAll({
      include: [
        {
          model: Dish,
          include: [
            {
              model: Sauce,
            },
          ],
        },
      ],
    });

    return getRecords(ticketDishSauceDetails);
  }

  async getTicketDishSauceById(id) {
    let ticketDishSauceDetails = await BuffetTicketDishSauce.findAll({
      where: {
        buffet_ticket_id: id,
      },
      include: [
        {
          model: Dish,
          include: [
            {
              model: Sauce,
            },
          ],
        },
      ],
    });

    const correlationId = generateCorrelationId();
    const connection = await rabbitMQ.connect();
    const channel = await rabbitMQ.createChannel(connection);

    const queue = "rpc_queue";

    const replyQueue = await channel.assertQueue("", { exclusive: true });

    const message = {
      buffet_ticket_id: id,
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

    ticketDishSauceDetails = getRecords(ticketDishSauceDetails);

    return { ticketDishSauceDetails, ticket: rpcData };
  }

  async addDishSauceToTiket(id, payload) {
    console.log(id, payload);
    for (let i = 0; i < payload.dishIds.length; i++) {
      await BuffetTicketDishSauce.create({
        buffet_ticket_id: id,
        dish_id: payload.dishIds[i],
      });
    }
  }

  async removeDishFromTicket(dishId, ticketId) {
    await BuffetTicketDishSauce.destroy({
      where: { buffet_ticket_id: ticketId, dish_id: dishId },
    });
  }
}

module.exports = new BuffetTicketDishSauceDetailService();
