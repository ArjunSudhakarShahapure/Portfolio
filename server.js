const express = require('express');
const app = express();

// Simple in-memory storage (resets when server restarts)
let visitors = [];

// Middleware to track visitors
app.use((req, res, next) => {
    const visitor = {
        ip: req.ip,
        time: new Date().toLocaleString(),
        page: req.path
    };
    visitors.push(visitor);
    next();
});

// Serve static files
app.use(express.static('public'));

// API endpoint to get visitor count
app.get('/api/visitors', (req, res) => {
    res.json({
        totalVisitors: visitors.length,
        recentVisitors: visitors.slice(-10) // Last 10 visitors
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
}); 