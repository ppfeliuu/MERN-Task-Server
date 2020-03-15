const express = require('express')
const connDB = require('./config/db')
const cors = require('cors')

//Create server
const app = express()

//Connect to DB
connDB()

//Enable cors
app.use(cors())

//Enable express .json
app.use(express.json({ extended: true }))

//Port app
const PORT = process.env.PORT || 4000

//Import routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

//Set main page
app.get('/', (req, res) => {
    res.send('Hola')
})

//Run app
app.listen(PORT, () => {
    console.log('Server running!')
})
