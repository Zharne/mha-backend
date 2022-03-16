const dotenv = require("dotenv");
const express = require('express');
const mongoose = require("mongoose");
const app = express();
dotenv.config();

//import routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use(express.json())
app.use('/posts', postsRoute);
app.use('/users', usersRoute);

//ROUTES
app.get('/', (req,res) => {
    res.send('We are home');
});

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
);

const port = process.env.PORT || 3000
app.listen(port, () => {
    `Server is connected to ${port}`
});