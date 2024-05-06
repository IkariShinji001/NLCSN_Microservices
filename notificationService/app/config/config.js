const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET
  },
  rabbitMQ:{
    connection: process.env.RABITMQ_CONECTION
  },
  nodemailer: {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  },

}

module.exports = config;