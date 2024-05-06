const { authenticate, isAdmin } = require("../middleware/auth");
const microservice = require("../config/microservice");
const billPath = "/bills";
const billRoute = [
  {
    path: `${billPath}/revenue`,
    target: microservice.billService.url
  },
  {
    path: `${billPath}/revenue/today`,
    target: microservice.billService.url
  },
  {
    path: `${billPath}/:id/payment`,
    target: microservice.billService.url
  },
  {
    path: `${billPath}/tables/:id/inuse`,
    target: microservice.billService.url,
  },
  {
    path: `${billPath}`,
    target: microservice.billService.url,
  },
];

module.exports = billRoute;
