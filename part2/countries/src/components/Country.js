import { useState } from 'react'
import WeatherInfo from './WeatherInfo'

const Country = ({country, forceShowData}) => {
  const [isShowData, showData] = useState(false)

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
        <WeatherInfo country={country} />
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