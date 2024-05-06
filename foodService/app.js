const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const ApiError = require("./app/api-error");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const DishRoute = require("./app/routes/dish.route");
const SauceRoute = require("./app/routes/sauce.route");
const DishSauceRoute = require("./app/routes/dishSauce.route");
const BuffetTicketDishSauceRoute = require("./app/routes/buffetTicketDishSauceDetail.route");
const billDishSauceDetailRoute = require("./app/routes/billDishSauceDetail.route")

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:10000",
  },
});
global.io = io;
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:9999", "http://localhost:10000"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/dishes", DishRoute);
app.use("/sauces", SauceRoute);
app.use("/dish-sauce", DishSauceRoute);
app.use("/buffet-ticket-dish-sauce", BuffetTicketDishSauceRoute);
app.use("/bill-dish-sauce-detail", billDishSauceDetailRoute);

// middleware xử lí lỗi
app.use((error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.log(error);
  res.status(500).json({ message: "Đã xảy ra lỗi khi xử lí ở server" });
});

module.exports = {server, io};
