const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  content: {
    type: String,
    required: true
  },
  animal_id: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

const EntryModel = mongoose.model('entry', EntrySchema);

module.exports = EntryModel;
