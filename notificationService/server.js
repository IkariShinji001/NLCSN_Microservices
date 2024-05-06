const app = require('./app');
const pgDB = require('./app/util/database');
const createConsumer = require('./app/consumers/notification.consumer');

const startServer = async () => {
  try {
    pgDB.sync();
    createConsumer('notification_exchange', 'notification.*', 'topic');
    app.listen(3001, () =>{
      console.log('listening on port 3001');
    })
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();