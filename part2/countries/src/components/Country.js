import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country, forceShowData}) => {
  const [isShowData, showData] = useState(false)
  const [weather, setWeather] = useState([])
  const latlng = country.capitalInfo.latlng
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        }).catch(error => {
          console.log(error)
        })
  }, [])


  if (isShowData || forceShowData) {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <div>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map(language => {
              return <li key={language}>{language}</li>
            })}
          </ul>
        </div>
        <img src={country.flags.png} alt={country.name.common} />
        {(Object.keys(weather).length !== 0)
          ? (<div>
              <h2>Weather in {country.capital}</h2>
              <p>temperature {weather.main.temp} Celcius</p>
              <p><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} /></p>
              <p>wind {weather.wind.speed} m/s</p>
            </div>)
          : ''
        }
      </div>
    )
  }

  return (
    <li>
      {country.name.common}
      <button onClick={showData}>show</button>
    </li>
  )
}

export default Country