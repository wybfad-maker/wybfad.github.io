// 连接到SQLite数据库
// let db = new sqlite3.Database(':memory:');
// let db = new sqlite3.Database('myDatabase.db');
const useProductEffect = (app, db) => {
  app.get('/products', (req, res) => {
    console.log(req.params, req.query);
    const { id, name } = req.query;
    if (!id && !name) {
      console.log(id, name)
      db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!rows) {
          return res.status(404).json({ error: 'Products not found' });
        }
        res.json({
          code: 200,
          data: rows,
          message: 'success'
        });
      });
      return;
    }
    if (name) {
      db.get(`SELECT * FROM products WHERE name = \'${name}\'`, (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ error: 'Products not found' });
        }
        res.json({
          code: 200,
          data: row,
          message: 'success'
        });
      });
      return;
    }
    if (id) {
      db.get(`SELECT * FROM products WHERE id = ${id}`, (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ error: 'Products not found' });
        }
        res.json({
          code: 200,
          data: row,
          message: 'success'
        });
      });
      return;
    }
  });
};
module.exports = useProductEffect;