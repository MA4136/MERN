const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect Database
connectDB()

app.get('/', (req, res) => res.send(`API running`))

const PORT = process.env.PORT || 4040

app.listen(PORT, () => console.log(`So it begins`))