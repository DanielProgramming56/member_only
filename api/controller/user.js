const Users = require('../model/user.js');
const bcrypt = require('bcrypt')
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

// sIGN Up
const createUser = async (req, res) => {
    const {username, email, isAdmin, password} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new Users({username, email, isAdmin, password: hashPassword });
        await user.save()
        req.login(user, function(err) {
            if (err) {return next(err)}
            res.redirect('/api/user/success')
        })
        

    } catch (error) {
        res.status(500).send(error.message)
       
    }
}


const deleteUser = (req, res) => {
    res.json({message: 'delete user'})
}

const getAllUser = (req, res) => {
    res.json({message: 'value of all users'})
}

const getUser = (req, res) => {
    res.json({message: 'value of one user'})
}

const getUserMessage = (req, res) => {
    res.json({message: 'getusermessage'})
}

module.exports = {getAllUser, getUser, getUserMessage, createUser, deleteUser}