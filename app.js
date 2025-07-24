const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use('/api', indexRouter);

const mongoURI = 'mongodb://localhost:27017/todo_db';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.listen(5001, () => console.log('Server is running on port 5001'));

