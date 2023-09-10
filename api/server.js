const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy; // Corrected the import statement
const sendMessage = require('connect-flash');
const dotenv = require('dotenv');
const  userRoute = require('./routes/user.js')
// Set options
const options = {}; // Removed the incorrect assignment

// Use options in your application
const app = express(); // Initialize your Express app
app.set('options', options);
app.use('/api/user', userRoute);

app.listen(port = 3056, () => console.log(`application is running @ port ${port}`))
