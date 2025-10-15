// Import required modules
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Create Express app
const app = express();

// Middleware
app.use(cors());                  // Enables CORS (cross-origin requests)
app.use(express.json());          // Parses incoming JSON requests

// Database connection configuration
const pool = new Pool({
    user: 'neondb_owner',
    host: 'ep-odd-waterfall-a1xgenpb-pooler.ap-southeast-1.aws.neon.tech',
    database: 'neondb',
    password: 'npg_T5DIlB7wJgVC',
    port: 5432,                    // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates (for hosted DB)
    },
});

// Authentication middleware
const authenticate = (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth === 'Bearer my-secret-token') {
        next(); // ✅ Proceed to next middleware/route if authenticated
    } else {
        res.status(401).json({ error: 'Unauthorized' }); // ❌ Block request if not authenticated
    }
};

// POST route to add a user
app.post('/adduser', authenticate, async (req, res) => {
    const { name, email, password } = req.body;  // ✅ Correct destructuring

    // Check if required fields are missing
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing username or email or password' });
    }

    try {
        // Insert user into database
        const result = await pool.query(
            'INSERT INTO registrations (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );

        // Respond with the inserted user
        res.status(201).json({
            message: 'User added successfully!',
            user: result.rows[0],
        });

    } catch (error) {
        console.error('Error inserting data:',error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET API to fetch all users
app.get('/get-users', authenticate, async (req, res) => {
    try {
        // Fetch all users from registrations table
        const result = await pool.query('SELECT * FROM registrations');

        res.status(200).json({
            message: 'Users fetched successfully!',
            users: result.rows
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('✅ Server running at http://localhost:3000/');
});