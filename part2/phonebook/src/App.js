import React, { useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header'
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040 - 1234567' },
    { name: 'Joel P. Mugalu', number: '050 - 1237456' },
    { name: 'Dan Abramov', number: '060 - 5612347' },
    { name: 'Clement Mihailescu', number: '070 - 1456237' },
    { name: 'Oliur Rahman', number: '080 - 3451267' },
    { name: 'Andres Pirela', number: '090 - 1562347' },
  ]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    // TODO Fix the functionality of not displaying already existing names
    persons.map((person) => {
      if (!Object.values(person).includes(newName)) {
        const newPerson = {
          name: newName,
          number: number,
        };
        setPersons(persons.concat(newPerson));
      } else {
        alert(`${newName} is already added to phonebook`);
      }
    });
  };

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNumber(event.target.value);
  };

  const filterNames = () =>
    persons.filter((person) =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  const filteredNames = filterNames();

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <div>
      <Header header="Phonebook" />
      <Filter nameFilter={filterNames} filterHandler={handleNameFilter} />
      <Header header="Add New Contact" />
      <PersonForm
        submitHandler={addPerson}
        nameValue={newName}
        numberValue={number}
        personHandler={handleNewPerson}
        numberHandler={handleNewNumber}
      />
      <Header header="Numbers" />
      {filteredNames.map((person) => (
        <p key={person.name}>
          {person.name} - {person.number}
        </p>
      ))}

    </div>
  );
};

export default App;
