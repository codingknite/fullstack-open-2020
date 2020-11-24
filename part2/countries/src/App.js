import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCountry from './components/DisplayCountry';
import Search from './components/Search';

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  const handleInput = (event) => {
    setCountry(event.target.value);
  };

  const filterCountries = () =>
    allCountries.filter((coun) => {
      if (coun.name.toLowerCase().includes(country.toLowerCase())) {
        return coun;
      }
    });

  const searchedCountries = filterCountries();

  return (
    <div>
      <Search inputHandler={handleInput} />
      <DisplayCountry countries={searchedCountries} />
    </div>
  );
};

export default App;
