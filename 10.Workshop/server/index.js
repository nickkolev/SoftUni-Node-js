const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

//     next();
// });

app.use(cors());
app.use(express.json());

app.use(routes);

mongoose.connect('mongodb://localhost:27017/furniture-workshop')
    .then(() => {
        console.log('Database connected');
    });

app.listen(3030, () => {
  console.log('Server is running on port 3030');
});