const express = require('express')
const route = express.Router()
const passport = require('passport')
const {getAllUser, getUser, getUserMessage, createUser, deleteUser, loginUser} = require('../controller/user')

// delete user
// create user
route.get('/success', (req, res) => {
    res.status(200).send('Login successful');
  });
  
  // Handle failed login
  route.get('/login', (req, res) => {
    res.status(401).send('Login failed');
  });
route.get('/get-users', getAllUser)
route.get('/get-user/:id', getUser)
route.get('/:id/messages/', getUserMessage)
route.post('/signup/', createUser)
route.post('/login/', passport.authenticate('local', {
    successRedirect: '/api/user/success', // Redirect on successful login
    failureRedirect: '/api/user/login',   // Redirect on failed login
  }));
route.delete('delete-user/:userId', deleteUser) 


module.exports = route