import React from 'react';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import useWeatherState from './WeatherState';

export function WeatherRadarChart() {
  const { weatherData } = useWeatherState();

  const temperature = weatherData?.temp != null ? weatherData.temp - 273.15 : 0;
  const feelsLike = weatherData?.feelsLike != null ? weatherData.feelsLike - 273.15 : 0;
  const humidity = weatherData?.humidity != null ? weatherData.humidity : 0;
  const windSpeed = weatherData?.windSpeed != null ? weatherData.windSpeed : 0;
  const cloudiness = weatherData?.clouds?.all != null ? weatherData.clouds.all : 0;

  const data = {
    labels: ['Temperature', 'Feels Like', 'Humidity', 'Wind Speed', 'Cloudiness'],
    datasets: [
      {
        label: 'Current Weather',
        data: [temperature, feelsLike, humidity, windSpeed, cloudiness],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={data}/>;
}
