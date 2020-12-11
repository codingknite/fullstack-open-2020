import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const APIKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${APIKey}&query=${city}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <div>
      <p>Temperature: {12}</p>
    </div>
  );
};

const Country = (props) => {
  const countries = props.countries;

  return countries.map((country) => (
    <div key={country.numericCode}>
      <h2>{country.name}</h2>

      <div>
        <p>{country.capital}</p>
        <p>Population - {country.population}</p>
      </div>

      <div>
        <h3>Languages</h3>
        <p>
          {country.languages.map((language) => (
            <li key={language.name}>{language.nativeName}</li>
          ))}
        </p>
      </div>

      <div>
        <img src={country.flag} alt="The Flag" width="300px" />
      </div>

      <div>
        <h3>Weather in {country.capital}</h3>
        <div>
          <Weather city={country.capital} />
        </div>
      </div>
    </div>
  ));
};

const DisplayCountry = (props) => {
  const countries = props.countries;
  const numCountries = countries.length;
  let result;

  if (numCountries > 10) {
    result = <p>Too many matches. Specify another filter</p>;
  } else if (numCountries > 1 && numCountries < 10) {
    return countries.map((country) => (
      <div key={country.numericCode}>
        <p>
          {country.name} <button onClick={() => {}}>show</button>
        </p>
      </div>
    ));
  } else if (numCountries === 1) {
    return (
      <>
        <Country countries={countries} />
      </>
    );
  }

  return (
    <div>
      <div>{result}</div>
    </div>
  );
};

export default DisplayCountry;
