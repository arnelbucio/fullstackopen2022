import { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherInfo = ({country}) => {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const latlng = (Object.keys(country.capitalInfo ).length === 0) ? country.latlng : country.capitalInfo.latlng

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      }).catch(error => {
        console.log(error)
      })
}, [])


  return weather && (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <p><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} /></p>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}


export default WeatherInfo