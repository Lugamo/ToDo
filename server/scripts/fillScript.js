const uuid = require('uuid/v4');

const User = require('../model/userModel');
const Task = require('../model/taskModel');

async function fillDatabse() {
  await tasksFill();
  await userFill();
}

function tasksFill() {
  const statusIterator = getStatus();
  for (let i = 0; i < 5; i += 1) {
    const taskData = {
      id: uuid(),
      title: `Task Title ${i + 1}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      assignedTo: [],
      status: statusIterator.next().value
    }
    const newTask = new Task(taskData);
  
    newTask.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Task Created')
      }
    })
  }
}

function userFill() {
  for (let i = 0; i < 2; i += 1) {
    const userData = {
      id: uuid(),
      name: `username${i + 1}`
    };
    const newUser = new User(userData);
  
    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else (
        console.log('User created')
      )
    });
  }
}

function* getStatus() {
  while (true) {
    yield 'open';
    yield 'in-progress';
    yield 'completed';
    yield 'archived';
  }
}

fillDatabse();