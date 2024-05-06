const { authenticate, isAdmin } = require("../middleware/auth");
const microservice = require("../config/microservice");
const buffetTicketPath = "/buffet-tickets";
const buffetTicketRoute = [
  {
    path: `${buffetTicketPath}/:id/image`,
    target: microservice.buffetTicketService.url,
  },
  {
    path: `${buffetTicketPath}/:id`,
    target: microservice.buffetTicketService.url,
    methods: {
      DELETE: {
        middlewares: isAdmin,
      },
      PATCH: {
        middlewares: isAdmin,
      },
    },
  },
  {
    path: `${buffetTicketPath}`,
    target: microservice.buffetTicketService.url,
    methods: {
      GET: {
        middlewares: authenticate,
      },
      POST: {
        middlewares: isAdmin,
      },
    },
  },
];

module.exports = buffetTicketRoute;
