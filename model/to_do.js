const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  content: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

ToDoSchema.index({content: 'text'});


const ToDoModel = mongoose.model('entry', ToDoSchema);

module.exports = ToDoModel;
