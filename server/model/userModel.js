const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo', { useNewUrlParser: true });

// Check if connection was successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const userSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    trim: false,
    unique: true,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
