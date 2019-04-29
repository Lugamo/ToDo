const mongoose = require('mongoose');
const uuid = require('uuid/v4');
const User = require('../model/userModel');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function createUser(req, res) {
  const userData = {
    id: uuid(),
    name: req.body.name
  };
  const newUser = new User(userData);

  newUser.save((err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({
      id: userData.id,
      name: userData.name
    });
  });
}

function getUsers(req, res) {
  const theQuery = req.query;

  const infoNotShow = {
    _id: 0,
    __v: 0,
  };

  User.find({}, infoNotShow).exec()
    .then((result) => {
      res.status(200).send({
        users: result
      });
    })
}

module.exports = {
  createUser,
  getUsers,
};