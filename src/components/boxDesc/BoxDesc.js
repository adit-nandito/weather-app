import wmoCodes from "../../config/wmoCodes.json";
import errorIcon from "../../assets/error.png";
import './style.css';

const generateWeatherStatus = (weather, isError) => {
  let component = 
  <div className="componentStatusWeather">
      <img style={{ width: "100px" }} src={errorIcon} alt="error"/>
    </div>

  if (!isError && weather) {
    const weatherCode = weather.current.weather_code;
    const currentHour = new Date().getHours();
    let time = 'night'
    if (currentHour >= 6 && currentHour < 18) {
      time = 'day';
    }

    component = (
      <div className="componentStatusWeather">
        <img src={wmoCodes[weatherCode][time].image} alt="weather-logo"/>
        <h2>{wmoCodes[weatherCode][time].description}</h2>
      </div>
    )
  }

  return component;
};

const generateWeatherDescription = (text1, text2) => {
  return (
    <div className="componentDescriptionWeather">
      <span>{text1}</span>
      <span style={{ fontWeight: "bold"  }}>{text2}</span>
    </div>
  )
};

const generateDescription = (weather, isError) => {
  let component = (
    <div id='weatherDescription' style={{ marginTop: "10px" }}>
      <h2>Something went wrong</h2>
    </div>
  )

  if (!isError && weather) {
    component = (
      <div id='weatherDescription' style={{ marginTop: "10px" }}>
        {generateWeatherDescription('Temperature', `${weather.current.temperature_2m}°C`)}
        {generateWeatherDescription('Wind Speed', `${weather.current.wind_speed_10m} km/h`)}
        {generateWeatherDescription('Humidity', `${weather.current.relative_humidity_2m} %`)}
      </div>
    )
  }


  return component;
}

const BoxDesc = (props) => {
  const { loading, weather, isError } = props;
  let component = '';
  if (!loading && (weather || isError)) { 
    component = (
      <div className="boxWeather">
        {/* {generateWeatherStatus(weather.current.weather_code)} */}
        {generateWeatherStatus(weather, isError)}
        {generateDescription(weather, isError)}
      </div>
    )
  }

  return component;
};

export default BoxDesc;
