const amqp = require("amqplib");
const handleMessage = require("./handleMessages/handleMessages.js");
async function createConsumer(exchange, bindingKey, exchangeType) {
  try {
    const connection = await amqp.connect("amqp://my-rabbit:5672");
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    const queue = await channel.assertQueue("", { exclusive: true });

    channel.bindQueue(queue.queue, exchange, bindingKey);

    channel.consume(queue.queue, async (msg) => {
      const message = JSON.parse(msg.content);
      if (message) {
        console.log(message);
        const jobType = message.jobType;
        switch (jobType) {
          case "updateTableStatus":
            await handleMessage.updateTableStatus(message);
            channel.ack(msg);
            break;
          default:
            console.log("Unknown job type, skipping processing.");
            break;
        }
      }
    });
  } catch (error) {
    console.error("Error creating consumer:", error);
  }
}

module.exports = createConsumer;
