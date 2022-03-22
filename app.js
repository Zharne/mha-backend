const dotenv = require("dotenv");
const express = require('express');
const mongoose = require("mongoose");
const app = express();
dotenv.config();


mongoose.connect(process.env.DB_CONNECTION,   //DATABASE_URL
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
);

//import routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
// const commentsRoute = require('./routes/comments');

app.use(express.json())

//ROUTES
app.get('/', (req,res) => {
    res.send('We are home');
});

app.use('/posts', postsRoute);
app.use('/users', usersRoute);
// app.use('/comments', commentsRoute);


// app.get('/Posts', (req,res) => {
//     res.send('We are at Posts');
// });

// app.get('/users', (req,res) => {
//     res.send('This is users');
// });
// app.get('/comments', (req,res) => {
//     res.send('We on comments');
// });

const port = process.env.PORT || 4000
app.listen(port, () => {
    `Server is connected to ${port}`
});