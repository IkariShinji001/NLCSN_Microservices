const {server} = require("./app");
const pgDB = require("./app/util/database");
const RPCCosumer = require("./app/consumers/food.consumer_rpc")

const startServer = async () => {
  try {
    pgDB.sync();
    RPCCosumer("rpc_queue_food")
    server.listen(3005, () => {
      console.log("listening on port 3005");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
