import Country from './Country'

const Countries = ({query, countries}) => {
  const filteredCountries = (query.trim() === '')
    ? []
    : countries.filter((country => {
      return country.name.common.toLowerCase().startsWith(query.toLowerCase())
    }))

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} forceShowData={true} />
  }

  return (
    <ul>
      {filteredCountries.map(country => {
        return (
          <Country key={country.cca3} country={country} />
        )
      })}
    </ul>
  )
}


export default Countries