const emailer = require('../custom/emailer');
const UserModel = require('../model/user');
console.log("epic");

send_mails();

async function send_mails(){
  console.log("send_mails");
  const filter = {};

  for await (const doc of UserModel.find(filter)) {
    console.log("doc");
    console.log(doc);

    if(doc.get_daily_updates && doc.get_daily_updates === "true"){
      console.log("true: ")
      console.log(doc);
      //emailer.send_daily_update_email(doc);
    }

  }
}
