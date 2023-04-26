require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectWithDB = require('./config/db');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extend: false }));

const PORT = 3000 || process.env.PORT;


connectWithDB();

app.use('/auth', require('./src/routes/user.routes'));

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});