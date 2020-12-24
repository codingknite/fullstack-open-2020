const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config')
const logger = require('./utils/loggers')
const blogRouter = require('./controllers/blogs')

const app = express()

const url = config.MONGODB_URI

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: false
    })
    .then(() => {
        logger.info('connected to MONGODB')
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


module.exports = app