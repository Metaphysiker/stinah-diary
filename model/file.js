const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  key: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  entry_id: {
    type: String,
    required: false
  },
  entry: {
    type: Schema.Types.ObjectId, ref: 'entry',
    required: false
  }
},
{
  timestamps: true
}
);

const FileModel = mongoose.model('file', FileSchema);

module.exports = FileModel;
