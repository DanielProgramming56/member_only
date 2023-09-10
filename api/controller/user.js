

const createUser = (req, res) => {
    res.json({message: 'user created'})
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