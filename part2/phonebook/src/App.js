import React, { useState, useEffect } from 'react';
import contactService from './services/person';
import Filter from './components/Filter';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [number, setNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [message, setMessage] = useState(null)

    useEffect(() => {
        contactService
            .getAll()
            .then((returnedObject) => {
                setPersons(returnedObject);
            });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        const existingPersons = persons.map((person) => person.name);
        const existingNumbers = persons.map((person) => person.number);

        if (
            !existingPersons.includes(newName) &&
            !existingNumbers.includes(number)
        ) {
            const newPerson = {
                name: newName,
                number: number,
            };
            contactService
                .create(newPerson)
                .then((newObject) => {
                    setPersons(persons.concat(newObject));
                    setMessage(`Added ${newObject.name}`)
                })
                .catch(error => {
                    setMessage(`${error}`)
                })
        } else {
            let ID;
            if (
                window.confirm(
                    `${newName} is already added in the phonebook, replace the old number?`
                )
            ) {
                persons.map((person) => {
                    if (person.name === newName || person.number === number) {
                        ID = person.id;
                    }
                });
                const newPerson = {
                    name: newName,
                    number: number,
                };
                contactService
                    .update(ID, newPerson)
                    .then((updatedDB) => {
                        persons.map((person) => {
                            if (person.name === updatedDB.name) {
                                const theID = person.id;
                                const copyPersons = { ...persons }
                                copyPersons[theID - 1].number = updatedDB.number;
                            }
                        })
                    });
            }
        }
    };

    const deletePerson = (ID, name) => () => {
        if (window.confirm(`Delete ${name} ?`)) {
            contactService
                .deleteItem(ID)
        }
    }

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
            <Notification name={message} />
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
                    {person.name} - {person.number}{' '}
                    <button value={person.name} onClick={deletePerson(person.id, person.name)}>
                        Delete
          </button>
                </p>
            ))}
        </div>
    );
};

export default App;
