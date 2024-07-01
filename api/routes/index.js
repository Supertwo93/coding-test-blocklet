const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();

const sqlite3 = require('sqlite3').verbose();

// 初始化数据库
const db = new sqlite3.Database('./user_profile.db'); // 使用文件存储数据库

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user_profile (
    username TEXT,
    email TEXT,
    phone TEXT
  )`);
  
  // 检查表中是否已有数据，如果没有则插入初始数据
  db.get('SELECT COUNT(*) AS count FROM user_profile', (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO user_profile (username, email, phone) VALUES ('Zenan', 'zenan@example.com', '1234567890')`);
    }
  });
});

// 获取用户资料
router.get('/profile', (req, res) => {
  db.get('SELECT * FROM user_profile', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// 更新用户资料
router.put('/profile', (req, res) => {
  const { username, email, phone } = req.body;
  db.run(`UPDATE user_profile SET username = ?, email = ?, phone = ?`, [username, email, phone], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Profile updated successfully' });
    }
  });
});

module.exports = router;