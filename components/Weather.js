"use client";

import { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Import search icon

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'df857946a3124733a7f85139242508'; // Replace with your WeatherAPI key

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`);
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeatherData(null);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-black rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Weather Forecast</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Enter city or country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={handleKeyPress} // Trigger fetch on Enter key
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <span className="p-2 text-gray-500 cursor-pointer" onClick={fetchWeather}>
                    <FaSearch />
                </span>
            </div>
            {weatherData && (
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
                    <p className="text-lg">Current: {weatherData.current.temp_c}°C, {weatherData.current.condition.text}</p>
                    <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} className="mx-auto" />
                    {weatherData.forecast.forecastday.map((day, index) => (
                        <div key={day.date} className="mt-4">
                            <h3 className="text-lg font-semibold">
                                {index === 0 ? 'Today' : formatDate(day.date)}
                            </h3>
                            <p>{formatDate(day.date)}</p> {/* Display day and date */}
                            <p>Max: {day.day.maxtemp_c}°C, Min: {day.day.mintemp_c}°C</p>
                            <img src={day.day.condition.icon} alt={day.day.condition.text} className="mx-auto" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Weather;