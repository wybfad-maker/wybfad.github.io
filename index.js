const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// 使用json中间件来解析JSON请求体
app.use(express.json());

// 连接到SQLite数据库
// let db = new sqlite3.Database(':memory:');
let db = new sqlite3.Database('myDatabase.db');
console.log('Connected to the database.', db);

//创建一个示例表
// db.serialize(() => {
//   db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
// });

// 插入数据的API
app.post('/addUser', (req, res) => {
  const { name, email } = req.body;
  const stmt = db.prepare("INSERT INTO user (name, email) VALUES (?, ?)");
  stmt.run(name, email, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
  stmt.finalize();
});

// 查询所有用户的API
app.get('/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      code: 200,
      data: {
        code: 200,
        message: 'success',
        total: rows.length,
        users: rows
      },
      message: 'success'
    });
  });
});

// 根据ID查询用户的API
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      code: 200,
      data: {
        code: 200,
        message: 'success',
        users: row
      },
      message: 'success'
    });
  });
});

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
