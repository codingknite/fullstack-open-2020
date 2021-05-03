require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/contact');


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'));

morgan.token('logpost', (req, res) => {
    console.log(res.body);
})
app.use(morgan('logpost'))

app.get('/api/persons', (request, response, next) => {
    Contact
        .find({})
        .then(contacts => {
            response.json(contacts)
        })
        .catch(error => next(error))
});

app.get('/info', (request, response, next) => {
    Contact
        .find({})
        .then(result => {
            response.send(`
        <div>
        <p> The Phonebook has info for ${result.length} people</p>
        <p>${new Date()}</p>
        </div>
        `)
        })
        .catch(error => next(error))
});

app.get('/api/persons/:id', (request, response, next) => {
    Contact
        .findById(request.params.id)
        .then(contact => {
            response.json(contact)
        })
        .catch(error => next(error))
});

app.post('/api/persons', (request, response, next) => {
    const newPerson = request.body;

    const person = new Contact({
        name: newPerson.name,
        number: newPerson.number
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
            mongoose.connection.close()
        })
        .catch(error => next(error))

    //TODO Update number if name already exists => Corrections
    //TODO Display Error when validation is not met => Corrections
})


app.delete('/api/persons/:id', (request, response, next) => {
    Contact
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Contact
        .findByIdAndUpdate(request.params.id, person, { new: true })
        .then(result => {
            response.json(response)
        })
        .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response
        .status(404)
        .send({
            error: 'Unknown Endpoint'
        })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

    console.log(error.message)
    console.log(error.name)

    if (error.name === 'CastError') {
        return response
            .status(400)
            .send({
                error: 'malformatted id'
            })
    }
    next(error)
}
app.use(errorHandler)

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});