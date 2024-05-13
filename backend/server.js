const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

// in this part we need to give spesfic access for the database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "abebe",
  password: "abebe",
  database: "crud",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR File");
    return res.json(data);
  });
});

// for create student

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student ('Name', 'Email' ) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("ERROR File");
    return res.json(data);
  });
});

// for Update student

app.put("/update/:id", (req, res) => {
  const sql = "update student set 'Name'=?,'Email'=? where Id=?";
  const values = [req.body.name, req.body.email];

  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("ERROR File");
    return res.json(data);
  });
});

// for Delete student

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE Id =?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("ERROR File");
    return res.json(data);
  });

  // server connect to database
});
app.listen(8081, () => {
  console.log("listening on");
});
