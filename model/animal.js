const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  name: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

AnimalSchema.index({name: 'text'});

const AnimalModel = mongoose.model('animal', AnimalSchema);

module.exports = AnimalModel;
