const app = require("./app");
const pgDB = require("./app/util/database");
const RPCConsumer = require('./app/consumers/bill.consumer_rpc')
const PSConsumer = require('./app/consumers/bill.consumer')

const startServer = async () => {
  try {
    pgDB.sync();
    RPCConsumer("rpc_queue_bill");
    PSConsumer("table_exchange", "table.*", "topic");
    app.listen(3003, () => {
      console.log("listening on port 3003");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
