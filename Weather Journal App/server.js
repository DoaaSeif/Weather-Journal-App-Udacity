
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

//Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));


// Setup Server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
	console.log("Server running");
	console.log(`running on localhost: ${port}`); 
}

//GET route that returns the projectData object in server code

app.get("/all", sendData);

function sendData(request,response) {
	
	response.send(projectData);
	console.log(projectData);
}

//POST route that adds incoming data to projectData

app.post("/add", addData);

function addData (request,response) {
//Using dot notation to assign variables in projectData array
	projectData.date = request.body.date; 
	projectData.temperature = request.body.temperature;
	projectData.userResponse = request.body.userResponse;
	response.end();
	console.log(projectData);
}
