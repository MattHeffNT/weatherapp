import React, { useEffect, useState } from 'react';
import '../styles/custom.css'

const Card: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [conditions, setConditions] = useState<any>(null);
  const [Arrernte, setArrernte] = useState<any>(null);

  // check if browser supports geolocation then grab lat/long for showPosition function
  // we'll use this function to also reverse geocode and name city. Maybe we can create an API for Aboriginal city names as well?

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);

  //     console.log(navigator.geolocation)
  //   } else {
  //     console.log("geolocation not supported in browser");
  //   }
  // }

  // function showPosition(position: any) {
  //   // console.log(position.coords.latitude, position.coords.longitude)
  //   // console.log(position)

  // }

  // getLocation()

  // get day
  const date = new Date()

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNumber = date.getDay()
  const dayName = dayNames[dayNumber];


  // fetch weather api
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        const response = await fetch(
          // for the location either allow for search and or draw from the location of IP etc
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Alice&Springs&aqi=no`
        );

        const data = await response.json();
        setWeather(data)
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeather();
  }, []);


  // Function to fetch data from the local API and then set as conditions variable
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await fetch('/conditions.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setConditions(jsonData.weather);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchConditions();

  }, []); // The empty dependency array ensures the effect runs only once on component mount

  // loop through conditions.json and use the weather api weather description string as the "key"
  // to see if the english matches, then it will pull from the json into our api



  // Loop through conditions without rendering it
  useEffect(() => {

    if (conditions) {




      for (let i = 0; i < conditions.length; i++) {

        // declare the weatherAPI variable and our API so we can see if the conditions match
        // if they do then we will display on our card
        const EnglishOurAPI = (conditions[i].condition);
        const EnglishWeather = weather.current.condition['text']

        if (EnglishOurAPI.toLowerCase() == EnglishWeather.toLowerCase()) {
          console.log(`match found...${EnglishWeather}, ${EnglishOurAPI}`)

          // get our API condition/translation and render
          setArrernte(conditions[i].translation)

        }

      };
    }
  }, [conditions, Arrernte]);


  return (
    <div className="container">
      <div className="card">
        <div className="card-header"><h2>Mparntwe | Alice Springs</h2></div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div id="celcius" className="col-sm">

                {weather ? (

                  <h2>{weather.current.temp_c}°C</h2>

                ) : <p> Loading ... </p>}

              </div>

              <div id="condition" className="col-sm">

                {weather ? (
                  <>
                    <p>{Arrernte} | {weather.current.condition['text']}</p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

            </div>

            <div className="row">
              <div id="day" className="col-sm">

                <h2 > {dayName} </h2>


              </div>
            </div>


            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
