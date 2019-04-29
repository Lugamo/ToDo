const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function deleteCollection(collection) {
  db.dropCollection(collection, (err) => {
    if (err) {
      console.log(`error deleting ${collection} collection`);
    } else {
      console.log('collection dropped');
    }
  });
}

deleteCollection('tasks');
deleteCollection('users');