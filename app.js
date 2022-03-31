const dotenv = require("dotenv");
const express = require('express');
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
dotenv.config();
// corsOptions = {
//     origin: "http://localhost:8080"
// };


mongoose.connect(process.env.DB_CONNECTION,   //DATABASE_URL
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
);

//import routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const contactRoute = require('./routes/contactRoute');
// const commentsRoute = require('./routes/comments');
app.use(cors());

// app.use(cors(corsOptions));

app.use(express.json())

//ROUTES
app.get('/', (req,res) => {
    res.send('We are home');
});

app.use('/posts', postsRoute);
app.use('/users', usersRoute);
app.use('/contact', contactRoute);
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

const port = process.env.PORT || 2020
app.listen(port, () => {
    `Server is connected to ${port}`
});