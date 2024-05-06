const express =  require('express')
const notificationRoute = require('./app/routes/notification.route')

const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/notifications', notificationRoute)


module.exports = app;