const useOrderEffect = (app, db) => {
  app.get('/orders', (req, res) => {
    console.log(req.params, req.query);
    const { id, user_id, product_id, order_date } = req.query;
    if (!id && !user_id && !product_id && !order_date) {
      console.log(id, user_id, product_id, order_date)
      db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!rows) {
          return res.status(404).json({ error: 'Orders not found' });
        }
        res.json({
          code: 200,
          data: rows,
          message: 'success'
        });
      });
      return;
    }
    if (product_id) {
      db.get(`SELECT * FROM orders WHERE product_id = \'${product_id}\'`, (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.json({
          code: 200,
          data: row,
          message: 'success'
        });
      });
      return;
    }
    if (user_id) {
      db.get(`SELECT * FROM orders WHERE user_id = \'${user_id}\'`, (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ error: 'Order not found' });
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
      db.get(`SELECT * FROM orders WHERE id = ${id}`, (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.json({
          code: 200,
          data: row,
          message: 'success'
        });
      });
      return;
    }
    if (order_date) {
      db.get(`SELECT * FROM orders WHERE order_date = \'${order_date}\'`, (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ error: 'Order not found' });
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
}
module.exports = useOrderEffect