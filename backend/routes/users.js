var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/create', function(req, res, next) {
  let db = new sqlite3.Database('./storage.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  db.run(`INSERT INTO users (user_id, latitude, longitude) VALUES(?,?,?)`, [req.query.user_id, JSON.parse(req.query.latitude), JSON.parse(req.query.longitude)], (err) => {
    console.log(err)
  });
  db.close(err => {
    return;
  })
  res.send('respond with a resource');
});

router.get('/get_user', async function(req, res, next) {
  let db = new sqlite3.Database('./storage.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  let row;
  await db.all(`SELECT * from users where user_id=?`, [req.query.user_id], (err, rows) => {
    row = rows[0];
    console.log(rows);
    res.send(row);
  });
  console.log('adsdas')
  db.close(err => {
    return;
  })
  
});
module.exports = router;
