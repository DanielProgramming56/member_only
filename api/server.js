const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const Users = require('./model/user.js')
const bcrypt = require('bcrypt')
const  userRoute = require('./routes/user.js')
const session = require('express-session')
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT


// Make json request valid
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
// Set options
const options = {}; // Removed the incorrect assignment
// Use options in your application
 // Initialize your Express app
app.set('options', options);


// set up express-session
app.use(session({secret: process.env.SESSION_KEY, resave: false, saveUninitialized: false}))

// Initialize Passport.js
app.use(passport.initialize())
app.use(passport.session())

// Configure the local strategy for username and password authentication
passport.use(new passportLocal(async (username, password, done) => {
    try {
        const user = await Users.findOne({username})
        if(!user)
        {
            return done(null, false, {message: 'Incorrect username'})
        }
        const isPasswordValid =  bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    } catch (error) {
        return done(error)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

// Connect to Database
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on(('connected'), () => {
    
    app.listen(port, () => console.log(`application is running @ port ${port}`))
})
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

  app.use('/api/user', userRoute);
  
  // Gracefully handle closing the database connection when your Node.js process exits
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  });