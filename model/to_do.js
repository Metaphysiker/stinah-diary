const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  completed: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: "work",
    required: true
  }
},
{
  timestamps: true
}
);

ToDoSchema.index({content: 'text'});


const ToDoModel = mongoose.model('to-do', ToDoSchema);

module.exports = ToDoModel;
