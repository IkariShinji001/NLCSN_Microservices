const microservice = {
  userService: {
    url: "http://buffetmicroservice-userService-1:3000",
  },
  tableService: {
    url: "http://buffetmicroservice-tableService-1:3002",
  },
  billService: {
    url: "http://buffetmicroservice-billService-1:3003",
  },
  buffetTicketService: {
    url: "http://buffetmicroservice-buffetTicketService-1:3004",
  },
  foodService: {
    url: "http://buffetmicroservice-foodService-1:3005",
  },
};

module.exports = microservice;
