const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AKash@123",
    database: "user_database"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});


app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            res.status(500).send("Error registering user");
            return;
        }
        res.status(200).send("User registered successfully");
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
