const amqp = require('amqplib');

module.exports = {
  connect: async () => {
    const connection = await amqp.connect('amqp://my-rabbit:5672');
    return connection;
  },

  close: (connection) => {
    connection.close();
  },

  createChannel: async (connection) => {
    const channel = await connection.createChannel();
    return channel;
  }
};