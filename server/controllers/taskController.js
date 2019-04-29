const mongoose = require('mongoose');
const uuid = require('uuid/v4')
const Task = require('../model/taskModel');
const validator = require('./verifications');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function getTasks(req, res) {
  const theQuery = req.query;
  let query = {};
  if (theQuery.title) {
    query = {
      title: {
        $regex : `.*${theQuery.title}*`,
        $options: 'i'
      }
    }
  }
  const infoNotShow = {
    _id: 0,
    __v: 0,
  };

  Task.find(query, infoNotShow).exec()
    .then((result) => {
      res.status(200).send({
        tasks: result
      });
    })
}

function postTask(req, res) {
  const data = validator.validate(req, res);
  
  if (data) {
    const taskData = {
      id: uuid(),
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      status: data.status
    }
    const newTask = new Task(taskData);
  
    newTask.save((err) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({
        id: taskData.id,
        title: taskData.title
      });
    })
  }
}

function updateTask(req, res) {
  const taskId = req.params.id
  const data = validator.validate(req, res);

  if (data) {
    const taskData = data
    
    Task.findOneAndUpdate({ id: taskId }, taskData, {new: true}, (err, result) =>{
      if (err) return res.status(500).send(err);
      return res.status(200).send({
        id: result.id,
        title: result.title,
        description: result.description,
        assignedTo: result.assignedTo,
        status: result.status,
      });
    })
  }
}

module.exports = {
  getTasks,
  postTask,
  updateTask,
};
