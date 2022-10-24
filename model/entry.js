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
  },
  animal: {
    type: Schema.Types.ObjectId, ref: 'animal',
    required: false
  }
},
{
  timestamps: true
}
);

EntrySchema.index({content: 'text'});


const EntryModel = mongoose.model('entry', EntrySchema);

module.exports = EntryModel;
