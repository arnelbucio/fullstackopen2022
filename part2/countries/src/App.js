import { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className="App">
      <Filter query={query} handleQueryChange={handleQueryChange} />
      <Countries query={query} countries={countries} />
    </div>
  );
}

export default App;
