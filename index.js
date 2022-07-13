//=============================================================================
// Basic Config
//=============================================================================
const express = require('express');
const cors = require('cors');

// instantiate express
const app = express();
// in deployment, port will be set for us with process.env PORT
// in development, app will run localhost:8000
app.set('port', process.env.PORT || 8000);

//=============================================================================
// Middleware
//=============================================================================
// `express.json` parses application/json request data and
//  adds it to the request object as request.body
app.use(express.json());
// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//=============================================================================
// ROUTES
//=============================================================================
// Redirect
app.get('/', (req, res) => {
	res.redirect('/api');
});

/* START CONTROLLERS HERE */

// Example
const jobsController = require('./controllers/jobs');
app.use('/api/user', jobsController);
/* END CONTROLLERS HERE */

// if in the controller, the .catch is thrown and next is invoked, it'll come back here
const { handleErrors } = require('./middleware/custom_errors');
app.use(handleErrors);

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
