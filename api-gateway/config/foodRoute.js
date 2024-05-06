const { authenticate, isAdmin } = require("../middleware/auth");
const microservice = require("../config/microservice");
const dishPath = "/dishes";
const saucePath = "/sauces";
const dishSaucePath = "/dish-sauce";
const ticketDishDetail = "/buffet-ticket-dish-sauce";
const billDishSauceDetail = "/bill-dish-sauce-detail";
const foodRoute = [
  {
    path: `${billDishSauceDetail}/statistic`,
    target: microservice.foodService.url,
  },
  {
    path: `${billDishSauceDetail}`,
    target: microservice.foodService.url,
  },
  {
    path: `${ticketDishDetail}/:id`,
    target: microservice.foodService.url,
  },
  {
    path: `${ticketDishDetail}`,
    target: microservice.foodService.url,
  },
  {
    path: `${dishSaucePath}/:id`,
    target: microservice.foodService.url,
  },
  {
    path: `${dishSaucePath}`,
    target: microservice.foodService.url,
  },
  {
    path: `${saucePath}/:id/image`,
    target: microservice.foodService.url,
  },
  {
    path: `${saucePath}/not-in`,
    target: microservice.foodService.url,
  },
  {
    path: `${saucePath}/:id`,
    target: microservice.foodService.url,
  },
  {
    path: `${saucePath}`,
    target: microservice.foodService.url,
  },
  {
    path: `${dishPath}/:id/image`,
    target: microservice.foodService.url,
  },
  {
    path: `${dishPath}/not-in`,
    target: microservice.foodService.url,
  },
  {
    path: `${dishPath}/:id`,
    target: microservice.foodService.url,
  },
  {
    path: `${dishPath}`,
    target: microservice.foodService.url,
  },
];

module.exports = foodRoute;
