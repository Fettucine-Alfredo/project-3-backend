// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Redirect
app.get('/', (req, res) => {
	res.redirect('/api/');
});

// Controllers

app.listen(3111, () => {
	console.log('Project 3 backend running');
});
