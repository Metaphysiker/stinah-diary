const emailer = require('../custom/emailer');
const UserModel = require('../model/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/stinah-diary');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

send_mails();

async function send_mails(){
  const filter = {};
  for await (const doc of UserModel.find(filter)) {

    if(doc.get_daily_updates && doc.get_daily_updates === "true"){
      await emailer.send_daily_update_email(doc);
    }

  }
  mongoose.disconnect();
}
