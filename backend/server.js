const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files like HTML, CSS, JS
app.use(express.static('user-registration')); // 'user_registration' is where your register.html is

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'AKash@123', // your MySQL password
    database: 'user_database', // your database name
});

db.connect((err) => {
    if (err) {
        console.error('Could not connect to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle registration POST request
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

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
