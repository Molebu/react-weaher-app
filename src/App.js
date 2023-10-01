import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  let [city, setCity] = useState("");
  let [result, setResult] = useState({});
  let [load, setLoad] = useState(false);

  function allVariables(response) {
    setLoad(true);
    setResult({
      temperature: response.data.main.temp,
      wind: Math.round(response.data.wind.speed),
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(api).then(allVariables);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city" onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );
  if (load) {
    return (
      <div>
        <h1>Weather App</h1>
        {form}
        <ul>
          <li>Temperature: {Math.round(result.temperature)}°C</li>
          <li>Description: {result.description}</li>
          <li>Humidity: {result.humidity}%</li>
          <li>Wind: {result.wind}km/h</li>
          <li>
            <img src={result.icon} alt={result.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Weather App</h1>
        {form}
        <small>
          <a href="" alt="">Open-source code</a> by Moleboheng Molatuli
        </small>
      </div>
      

      
    );
  }
}
