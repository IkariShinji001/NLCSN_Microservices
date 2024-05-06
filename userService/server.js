const app = require('./app');
const pgDB = require('./app/util/database');

const startServer = async () => {
  try {
    pgDB.sync();
    app.listen(3000, () =>{
      console.log('listening on port 3000');
    })
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();