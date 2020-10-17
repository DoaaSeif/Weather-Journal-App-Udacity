
/* Global Variables */

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '248d0f01d7e9ee895d357d7c52f6067d';

// Create a new date instance dynamically with JS
let d = new Date();
//The getMonth() function returns values from 0-11 therefore added 1 to it to get accurate month
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();

//Testing if date is accurate
console.log(newDate);


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
	const newZip = document.getElementById('zip').value;
	const feelings = document.getElementById('feelings').value;
	getWeather(baseURL, newZip, apiKey)
	  .then(function(data){
	   //The returned data from the open weather map has the temperature inside vairable temp which is inside the variable main
	    postData('http://localhost:8000/add', {temperature:data.main.temp, date:newDate, userResponse:feelings})
	  
	  .then(function() {
	    updateUI()
	  })
	})
}

//GET request to the route

//The path to get weather is: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
//The country code can be ignored and the app will use the default country which is US
//Added the units= metric to the path to get the temperature in celsius 

const getWeather = async (baseURL, zip, key)=> {
	const response = await fetch(baseURL + zip + '&APPID=' + key + '&units=metric')
	  try {
	    const data = await response.json();
	    return data;
	  }  
	  catch(error) {
	    console.log("error", error);
	  }
}

//POST request to the route

const postData = async ( url = '', data = {})=>{
   
      const request = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await request.json();
        return newData;
      }

      catch(error) {
      console.log("error", error);
      }
  }

const updateUI = async () => {
  const request = await fetch('http://localhost:8000/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = 'Today\'s Date: ' + allData.date;
    document.getElementById('temp').innerHTML = 'Current Temperature: ' + allData.temperature + ' Celsius';
    document.getElementById('content').innerHTML = 'You\'re feeling: ' + allData.userResponse;
  }
  catch(error){
    console.log("error", error);
  }
}

