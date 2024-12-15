const mariadb = require('mariadb');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mariadb.createPool({
  host: '192.168.0.106',
  user: 'cAlamos',
  password: '-xTG91a6rB-',
  database: 'Alamos',
  port: 3306,
  connectionLimit: 5,
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?',
      [email, password]
    );

    if (rows.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
