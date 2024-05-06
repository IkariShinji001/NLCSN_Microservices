const { authenticate, isAdmin } = require("../middleware/auth");
const microservice = require("../config/microservice");
const mainPath = "/users";
const userRoute = [
  {
    path: `${mainPath}/verify-access-token`,
    target: microservice.userService.url,
  },
  {
    path: `${mainPath}/verify-manager`,
    target: microservice.userService.url,
  },
  {
    path: `${mainPath}/reset-password`,
    target: microservice.userService.url,
  },
  {
    path: `${mainPath}/logout`,
    target: microservice.userService.url,
  },
  {
    path: `${mainPath}/login`,
    target: microservice.userService.url,
  },
  {
    path: `${mainPath}/forget-password`,
    target: microservice.userService.url,
  },
  {
    path: `${mainPath}/:id`,
    target: microservice.userService.url,
  },
  {
    path: `${mainPath}/`,
    target: microservice.userService.url,
    methods: {
      PUT: {
        middlewares: isAdmin,
      },
    },
  },
];

module.exports = userRoute;
