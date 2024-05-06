const amqp = require("amqplib");
const handleMessage = require("../consumers/handleMessages/handleMessages.js");
async function createConsumer(exchange, bindingKey, exchangeType) {
  try {
    const connection = await amqp.connect("amqp://my-rabbit:5672");
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, exchangeType, { durable: true });

    const queue = await channel.assertQueue("", { exclusive: true });

    channel.bindQueue(queue.queue, exchange, bindingKey);

    channel.consume(queue.queue, (msg) => {
      const message = JSON.parse(msg.content);
      if (message) {
        const routingKey = msg.fields.routingKey;
        const jobType = routingKey.substring(routingKey.indexOf(".") + 1);
        // Xử lý tin nhắn theo chủ đề
        switch (jobType) {
          case "forget_password":
            handleMessage.sendMailResetPassword(message);
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