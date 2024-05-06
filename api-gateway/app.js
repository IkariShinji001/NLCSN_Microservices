const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routesConfig = require('./config/config'); // Import cấu hình routes

const app = express();
const PORT = 8080;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: ['http://localhost:9999', 'http://localhost:10000']}));

routesConfig.routes.forEach(route => {
    const target = route.target;
    const proxyMiddleware = createProxyMiddleware({
      target: target,
      changeOrigin: true,
    });
    app.use(route.path, (req, res, next) => {
      console.log(route.path);
      const methodMiddlewares = route.methods && route.methods[req.method] ? route.methods[req.method].middlewares : [];
      if(methodMiddlewares.length > 0) {
        methodMiddlewares(req, res, next); 
      }else{
        next()
      }
    }, proxyMiddleware);
  });

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`API Gateway đang chạy tại http://localhost:${PORT}`);
});

