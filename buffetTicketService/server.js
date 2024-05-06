const app = require("./app");
const pgDB = require("./app/util/database");
const RPCConsumer = require("./app/consumers/buffetTicketService.rpc_consumer");

const startServer = async () => {
  try {
    pgDB.sync();
    RPCConsumer("rpc_queue");
    app.listen(3004, () => {
      console.log("listening on port 3004");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
