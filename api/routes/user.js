const express = require('express')
const route = express.Router()
const {getAllUser, getUser, getUserMessage, createUser, deleteUser} = require('../controller/user')

// delete user
// create user

route.get('/get-users', getAllUser)
route.get('/get-user/:id', getUser)
route.get('/:id/messages/', getUserMessage)
route.post('create-user/', createUser)
route.delete('delete-user/:userId', deleteUser) 


module.exports = route