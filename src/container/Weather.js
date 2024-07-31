import React, { useState, useEffect } from "react";
import axios from "axios";
import BoxDesc from "../components/boxDesc/BoxDesc";
import SelectBox from "../components/selectBox/SelectBox";
import './style.css'

// Weather Component
const Weather = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const handleChangeCity = (event) => {
    setSelectedCity(event.target.value);
  };

  const fetchWeather = async () => {
    setError(false);
    if (selectedCity !== '') {
      setLoading(true);
      try {
        const result = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${selectedCity}&count=1`)
  
        const { latitude, longitude } = result.data.results[0]
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=Asia%2FBangkok`
        );
        setWeather(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setWeather(null)
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [selectedCity]);

  return (
    <div className="containerWeather">
      <h1>Weather Cities in Indonesia</h1>
      <div className="componentWeather">
      <SelectBox selectedCity={selectedCity} handleChangeCity={handleChangeCity} />

      {!loading && !isError && weather && (<h4>
        Last Update: {new Date(weather.current.time).toLocaleString('id-ID').replaceAll('.', ':')}
      </h4>)}

      <BoxDesc weather={weather} loading={loading} isError={isError} />

      {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Weather;
