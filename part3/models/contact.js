const mongoose = require('mongoose')

const url = process.env.MONGODB_URI;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.log('Error connecting to MongoDB', error);
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    number: {
        type: Number,
        required: true,
        minlength: 8
    }
})

personSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id.toString()
        delete object._id
        delete object.__v
    }
})

module.exports = mongoose.model('Contact', personSchema);