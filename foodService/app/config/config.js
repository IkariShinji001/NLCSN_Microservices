const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET
  },
  rabbitMQ:{
    connection: process.env.RABITMQ_CONECTION
  }

}

module.exports = config;