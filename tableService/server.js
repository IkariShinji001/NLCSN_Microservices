const app = require("./app");
const pgDB = require("./app/util/database");
const RPCConsumer = require("./app/consumers/tableService.rpc_consumer");
const Consumer = require("./app/consumers/tableService.consumer");

const startServer = async () => {
  try {
    pgDB.sync();
    RPCConsumer("rpc_queue_table");
    Consumer("bill_exchange", "bill.*", "topic");
    app.listen(3002, () => {
      console.log("listening on port 3002");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
