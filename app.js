const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser =  require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', indexRouter);
const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI, {
    dbName: 'todo_db'
})
    .then(() => console.log('Connected to MongoDB - todo_db database'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.listen(process.env.PORT || 5001, () => console.log('Server is running on port 5001'));

