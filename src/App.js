import React, {useEffect, useState} from "react";
import './App.css';


function App() {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [clouds, setClouds] = useState(null);
  const [temp, setTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDeg, setWindDeg] = useState(null);
  const [weatherdesc, setWeatherDesc] = useState('');
  const [visibility, setVisibility] = useState(null);
     
  async function fetchLatLon(city){
    const apiKey = "505856195fe7325b2c9349355fb049a0";
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
        setLat(data[0].lat);
        setLon(data[0].lon);
    } catch (error){
      console.error(error);
      throw error;
    }
  }
  async function fetchWeather(lat,lon){
    const apiKey = "505856195fe7325b2c9349355fb049a0";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try{
      const response = await fetch(apiUrl);
      const data = await response.json();
      return console.log(data);
    } catch (error){
      console.error(error);
      throw error
    }
  }
  const clickSearch = () => {
    fetchLatLon(city);
  };
  useEffect(() => {
      if (lat !== null && lon !== null){
      fetchWeather(lat,lon);
    }
  }, [lat,lon]);





  return (
    <div className="App">
      <h1>Weather Checker</h1>
      <div className="container">
      <input 
      placeholder="Enter city name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={clickSearch}>Search</button>
    
    </div>
    </div>
  );
}

export default App;


//Display current weather including weather condition, temperature, humidity, wind speed, and date and time
//Visualization to display the temperature change, humidity change, and weather conditions of each day