const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- HELPER FUNCTIONS (The "File Database") ---

// 1. Ensure the file exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// 2. Read users from file
const getUsers = () => {
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
};

// 3. Write users to file
const saveUsers = (users) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
};

// --- ROUTES ---

// 1. Register (Sign Up)
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    const users = getUsers();

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Save new user
    const newUser = { id: Date.now(), email, password }; // In production, hash this password!
    users.push(newUser);
    saveUsers(users);

    console.log('User registered:', email);
    res.status(201).json({ message: 'User created successfully', user: newUser });
});

// 2. Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();

    // Find user matching credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log('User logged in:', email);
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// 3. Get Products (Mock Data for E-commerce)
app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://placehold.co/150' },
        { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://placehold.co/150' },
        { id: 3, name: 'Running Shoes', price: 75.50, image: 'https://placehold.co/150' }
    ];
    res.json(products);
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});