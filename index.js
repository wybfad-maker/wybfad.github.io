const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const { useUserEffect, useProductEffect, useOrderEffect } = require('./server/index.js');

// 使用json中间件来解析JSON请求体
app.use(express.json());

// 连接到SQLite数据库
// let db = new sqlite3.Database(':memory:');
let db = new sqlite3.Database('myDatabase.db');
console.log('Connected to the database.', db);

//创建一个示例表
// db.serialize(() => {
//   db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");
// });

// 用户相关的路由和逻辑
useUserEffect(app, db);
// 商品相关的路由和逻辑
useProductEffect(app, db);
// 订单相关的路由和逻辑
useOrderEffect(app, db);


// 关闭数据库连接
// app.use((req, res, next) => {
//   db.close((err) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     next();
//   });
// });

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
