import React from 'react';
import { Radar, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';


export function WeatherRadarChart({weatherData}) {
  const  weather  = weatherData;

  const temperature = weather.temp - 273.15;
  const feelsLike = weather.feelsLike - 273.15;
  const humidity = weather.humidity;
  const windSpeed = weather.windSpeed;
  const cloudiness = weather.clouds.all;
  const minTemp = weather.minTemp - 273.15;
  const maxTemp = weather.maxTemp - 273.15;

  const dataRadar = {
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

  const dataBar = {
    labels: ['Temperature', 'Feels Like', 'Min Temp', 'Max Temp'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [temperature, feelsLike, minTemp, maxTemp], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPie = {
    labels: ['Cloudiness', 'Clear Sky'],
    datasets: [
      {
        data: [cloudiness, (100-cloudiness)], // Assuming 75% cloudiness for demonstration
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className='radar'>
      <Radar data={dataRadar} />
      </div>
      <div className='Bar'>
      <Bar data={dataBar} />
      </div>
      <div className='Pie'>
        <Pie data={dataPie} />
      </div>
    </div>
  );
}
