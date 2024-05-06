const express =  require('express')
const cors = require('cors')
const ApiError = require('./app/api-error');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();


const tableRoute = require('./app/routes/table.route')
const areaRoute = require('./app/routes/area.route');

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: ['http://localhost:9999', 'http://localhost:10000']}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tables', tableRoute)
app.use('/areas', areaRoute);

// middleware xử lí lỗi
app.use((error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({message: error.message});
  }
  console.log(error);
  res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lí ở server' });
});

module.exports = app;

