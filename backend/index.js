const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const credConnection = require('./db/creddb')
const cookieParser = require('cookie-parser')
const app = express()



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/authrouter'));



app.listen(3000, () => {
    console.log('Listening on port 3000');
    credConnection()
});