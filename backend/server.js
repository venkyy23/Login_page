// Import the Express library
const express = require('express');

// Create an Express application
const app = express();

// Middleware to parse incoming JSON data from request body
app.use(express.json());


// -------------------- ROUTE HANDLERS --------------------

// Handle GET request for the root ("/") route
app.get('/', (req, res) => {
    res.send('This is a GET request.');
});

// Handle GET request for the "/about" route
app.get('/about', (req, res) => {
    res.send('This is a About Page.');
});

// Handle GET request for the "/details" route
app.get('/details', (req, res) => {
    res.send('This is a details Page.');
});


// Handle POST request for the "/submit" route
app.post('/submit', (req, res) => {
    // Log the incoming request body to the console
    console.log(`${JSON.stringify(req.body)}`);

    // Send response back to client with the received data
    res.send(`Received POST data: ${JSON.stringify(req.body)}`);
});


// -------------------- START SERVER --------------------

// Start server on port 3000 and log the running URL
app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});
