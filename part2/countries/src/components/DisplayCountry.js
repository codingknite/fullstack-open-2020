import React, { useEffect } from 'react';
import axios from 'axios';

const Country = (props) => {
  let weather;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current
    ? access_key = ${process.env.REACT_APP_API_KEY}
    & query = ${props.countries.capital}`
      )
      .then((response) => {
        weather = response.data;
      });
  }, []);

  console.log(weather);

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
        <div>weather</div>
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
