const amqp = require("amqplib");
const handleMessage = require("./handleMessages/handleMQ.js");
async function createConsumerRPC(queueName) {
  try {
    const connection = await amqp.connect("amqp://my-rabbit:5672");
    const channel = await connection.createChannel();

    const queue = await channel.assertQueue(queueName, { exclusive: true });

    channel.consume(queue.queue, async (msg) => {
      const message = JSON.parse(msg.content);
      if (message) {
        const jobType = message.jobType;
        switch (jobType) {
          case "getBillFoodDetailsByBillId":
            const data = await handleMessage.getBillFoodDetailsByBillId(message);
            channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(data)),
              { correlationId: msg.properties.correlationId }
            );

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

module.exports = createConsumerRPC;
