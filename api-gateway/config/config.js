const userRoute = require('./userRoute');
const tableRoute = require('./tableRoute');
const buffetTicketRoute = require('./buffetTicketRoute');
const foodRoute = require('./foodRoute');
const billRoute = require('./billRoute');
const routesConfig = {
  routes: [
    ...userRoute,
    ...tableRoute,
    ...buffetTicketRoute,
    ...foodRoute,
    ...billRoute,
  ],
};


module.exports = routesConfig;
