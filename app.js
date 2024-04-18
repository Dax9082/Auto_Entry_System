const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Daksh28@xxx',
  database: 'daksh'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.get('/getStudents', (req, res) => {
  const sql = 'SELECT * FROM studentinfo';
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.post('/addEntry', (req, res) => {
  const { studentId, destination } = req.body;
  const currentTime = new Date();
  const sql = 'UPDATE studentinfo SET destination = ?, exitTime = ? WHERE student_id = ?';
  db.query(sql, [destination, currentTime, studentId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add entry' });
      return;
    }
    res.status(200).end();
  });
});
app.post('/changeEntry', (req, res) => {
  const { studentId } = req.body;
  const currentTime = new Date();
  const sql = 'UPDATE studentinfo SET enrtyTime = ? WHERE student_id = ?';

  db.query(sql, [currentTime, studentId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update entry time' });
      return;
    }
    res.status(200).json({ message: 'Entry time updated successfully' });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
