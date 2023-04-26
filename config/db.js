const { default: mongoose } = require("mongoose");
require('dotenv').config();


mongoose.set('strictQuery', true)
const connectWithDB = () => mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connectWithDB;