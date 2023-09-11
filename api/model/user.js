const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
        maxLength: 30, // Corrected the typo here
        trim: true,
        unique: true,
        lowercase: true
    },
    email: {    
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    isAdmin: { type: Boolean, default: false }
});

const User  = mongoose.model('User', UserSchema);
module.exports = User
