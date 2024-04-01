import { useState, useCallback } from 'react';

const useWeatherState = () => {
  const [weatherData, setWeatherData] = useState({
    clouds: null,
    temp: null,
    minTemp: null,
    maxTemp: null,
    feelsLike: null,
    pressure: null,
    humidity: null,
    windSpeed: null,
    windDeg: null,
    weatherdesc: '',
    visibility: null,
  });

  const fetchWeatherData = useCallback(async (lat, lon, apiKey, setIsVisible) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setWeatherData({
        clouds: data.clouds,
        temp: data.main.temp,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        feelsLike: data.main.feels_like,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        weatherdesc: data.weather[0].description,
        visibility: data.visibility,

      });
      setIsVisible(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []); // Dependencies array for useCallback

  return { weatherData, fetchWeatherData };
};

export default useWeatherState;


