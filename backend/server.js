const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

app.use(express.static('user-registration')); 


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'AKash@123',
    database: 'user_database', 
});

db.connect((err) => {
    if (err) {
        console.error('Could not connect to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    
    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Registration failed');
        }
        res.send('Registration successful');
    });
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
