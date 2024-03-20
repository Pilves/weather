import React, {useEffect, useState} from "react";
import useWeatherState from './WeatherState';
import './App.css';
import {WeatherRadarChart} from "./radarchart.js";


function App() {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const {weatherData, fetchWeatherData} = useWeatherState();

  //const apiKey = "505856195fe7325b2c9349355fb049a0";
  const apiKey = "88c1f793accbb6fa185e157a60772a5a";
  async function fetchLatLon(city){
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
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

  const clickSearch = () => {
    fetchLatLon(city);
  };

  useEffect(() => {
    setCurrentDateTime(new Date());
  }, []);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      fetchWeatherData(lat, lon, apiKey, setIsVisible); 
    }
  }, [lat, lon, apiKey, fetchWeatherData]);



  return (
    <div className="App">
      <h1>Weather Checker</h1>
      <div className="container">
        <div className="search-container">
          <input 
            className="search-input"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-button" onClick={clickSearch}>Search</button>
        </div>
        <div className="weather-info">
          <div className="current-date-time">
            <p>{currentDateTime.toLocaleString()}</p>
          </div>
          <div className="temperature-info">
            <p>{weatherData.temp && `Temperature: ${Math.round(weatherData.temp - 272.15)}°C`}</p>
          </div>
          <div className="additional-info">
            {weatherData.weatherdesc && (
              <div className="weather-desc">
                <p>Description: {weatherData.weatherdesc}</p>
              </div>
            )}
            {weatherData.feelsLike && (
              <div className="feels-like">
                <p>Feels Like: {Math.round(weatherData.feelsLike - 272.15)}°C</p>
              </div>
            )}
            {weatherData.humidity && (
              <div className="humidity-info">
                <p>Humidity: {weatherData.humidity}%</p>
              </div>
            )}
            <div className="wind-info" style={{ display: isVisible ? 'block' : 'none' }}>
              <img 
                src="https://www.svgrepo.com/show/533632/arrow-up.svg" 
                alt="arrow"
                className="wind-direction"
                style={{ transform: `rotate(${weatherData.windDeg}deg)` }}
              />
              {weatherData.windSpeed && <p>Wind Speed: {weatherData.windSpeed} m/s</p>}
            </div>
          </div>
        </div>
        
        <div className="chart-container">
        <div className="charts">
          {weatherData.temp && <WeatherRadarChart weatherData={weatherData} />}
        </div>
        </div>
        </div>
      
    </div>
  );
}

export default App;


//Display current weather including weather condition, temperature, humidity, wind speed, and date and time
//Visualization to display the temperature change, humidity change, and weather conditions of each day

