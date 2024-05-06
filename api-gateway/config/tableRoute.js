const { authenticate, isAdmin } = require("../middleware/auth");
const microservice = require("../config/microservice");
const tablePath = '/tables'
const areaPath = '/areas'
const userRoute = [
  {
    path: `${areaPath}/:id/tables`,
    target: microservice.tableService.url, 
  },
  {
    path: `${areaPath}/:id`,
    target: microservice.tableService.url, 
  },
  {
    path: `${areaPath}`,
    target: microservice.tableService.url, 
  },
  {
    path: `${tablePath}/:id`,
    target: microservice.tableService.url, 
  },
  {
    path: `${tablePath}`,
    target: microservice.tableService.url, 
  }
];

module.exports = userRoute;
