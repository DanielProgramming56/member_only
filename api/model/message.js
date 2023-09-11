// message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Add other message-specific fields as needed
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);
