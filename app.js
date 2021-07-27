console.log("App")

const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const logger = require('morgan');
const bodyParser = require('body-parser')


const PORT = config.get('port') || 3000

const app = express()

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/products'))


async function start() {
    try {
        const mongoUrl = config.get('mongoUrl')
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, () => {
            console.log("Connected to db..")
        })

        const server = app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

        process.on('exit', server.close)
    }
    catch (e) {
        console.log("Server error", e.message)
        process.exit(1)
    }
}

start()
