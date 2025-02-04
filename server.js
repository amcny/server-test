const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let users = [];

// POST route to add a user
app.post('/users', (req, res) => {
    const { name, email, password, roll, department, year } = req.body;
    if (!name || !email || !password || !roll || !department || !year) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const user = {
        id: uuidv4(),
        name,
        email,
        password,
        roll,
        department,
        year // In production, always hash passwords
    };

    users.push(user);
    res.status(201).json(user);
});

// GET route to fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
