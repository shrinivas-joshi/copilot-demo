// Create web server
const express = require('express');
const app = express();
const port = 3000;

//import comments
const comments = require('./comments');

//create a route
app.get('/comments', (req, res) => {
    res.json(comments);
});

//start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
// Path: comments.js
module.exports = [
    {
        id: 1,
        body: "Love this!"
    },
    {
        id: 2,
        body: "Super good"
    },
    {
        id: 3,
        body: "You are the best"
    },
    {
        id: 4,
        body: "Ramen is my fav food ever"
    },
    {
        id: 5,
        body: "Nice nice nice!"
    }
];
