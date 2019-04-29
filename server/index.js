const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const taskController = require('./controllers/taskController');
const userController = require('./controllers/userController');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// To get list of tasks, can search by query parameter
app.get('/task', (req, res) => {
  taskController.getTasks(req, res);
});

// Create a new Task
app.post('/task', (req, res) => {
  taskController.postTask(req, res);
});

// update a task
app.put('/task/:id', (req, res) => {
  taskController.updateTask(req, res);
});

// Create an user
app.post('/user', (req, res) => {
  userController.createUser(req, res);
});

// Create an users
app.get('/user', (req, res) => {
  userController.getUsers(req, res);
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});