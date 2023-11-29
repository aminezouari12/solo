const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());
const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "jobcenter",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected si zouari!')
  }
});

app.get("/", (req, res) => {
  res.json("this is backand").send("Hello from the server!");
});
app.get("/people", (req, res) => {
  const sql = "SELECT * FROM people";
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/people", (req, res) => {
  const sql =
    "INSERT INTO people(`name`,`description`,`phonenumber`,`picture`) VALUES (?,?,?,?)";
  const values = [
    req.body.name,
    req.body.description,
    req.body.phonenumber,
    req.body.picture,
  ];
  connection.query(sql,values, (err, data) => {
    if (err) return res.json(err);
    return res.json("posted")
  });
});
app.delete("/people/:id",(req,res)=>{
  const personId=req.params.id
  const sql=`DELETE FROM people where id = ${personId} `
  connection.query(sql,[personId],(err,data)=>{
    if(err)return res.json(err)
    return res.json("person deleted")
  })
})

app.put("/people/:id",(req,res)=>{
  const personId=req.params.id
  const sql=`UPDATE  people SET name=?  WHERE id = ${personId}`
  const values=[ req.body.name]
  connection.query(sql,[values],(err,data)=>{
    if(err)return res.json(err)
    return res.json("Updated")
  })
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
