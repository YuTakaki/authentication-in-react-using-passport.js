const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');



const app = express();

//connect mongoose
mongoose.connect('mongodb://localhost/authentication', {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => console.log('connected to the database'))
    .catch(err => console.log(err))

//passport middleware
require('./setup/passport')(passport);
app.use(session({
    secret : 'cat',
    resave : true,
    saveUninitialized : true,
}));

app.use(passport.initialize());
app.use(passport.session());
//connect route
app.use('/authentication', require('./routes/index'));

const port = process.env.port || 4000;

app.listen(port, () => console.log(`you are now listening to port ${port}`));