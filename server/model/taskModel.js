const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo', { useNewUrlParser: true });

// Check if connection was successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const taskSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    trim: false,
    required: true,
  },
  description: {
    type: String,
    trim: false,
    required: false,
  },
  assignedTo: [{
    name: {
      type: String,
      trim: false,
      required: false,
    },
    id: {
      type: String,
      trim: false,
      required: false,
    }
  }
],
  status: {
    type: String,
    trim: false,
    required: true,
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
