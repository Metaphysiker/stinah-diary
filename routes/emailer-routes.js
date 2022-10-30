const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const UserModel = require('../model/user');
const EntryModel = require('../model/entry');


router.get(
  '/emailer/daily_update',
  async (req, res, next) => {
    //console.log("daily update");

    const filter = {};
    //const users = await UserModel.find(filter);

    for await (const doc of UserModel.find(filter)) {

      if(doc.get_daily_updates && doc.get_daily_updates === "true"){
        send_daily_update_email(doc);
      }

    }

    res.sendStatus(200);
  }
);

router.get(
  '/emailer/:user_id',
  async (req, res, next) => {
    //req.params.user_id
    //console.log(req.user);
    send_test_email(req.user);

    res.sendStatus(200);
  }
);

router.get(
  '/emailer/send_test_email',
  async (req, res, next) => {
    //req.params.user_id
    //console.log(req.user);
    send_test_email(req.user);

    res.sendStatus(200);
  }
);


module.exports = router;

async function send_test_email(user){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.oriented.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sandro.raess@philosophie.ch', // generated ethereal user
      pass: process.env.orientedEmailPassword, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Sandro Räss" <sandro.raess@philosophie.ch>', // sender address
    to: user.email, // list of receivers
    subject: "Test-Email", // Subject line
    text: "Test Test Test", // plain text body
    html: "<b>Test Test Test?</b>", // html body
  });

}

async function generate_html_for_daily_update_email(entries){
  var html_string = "<b>Daily Update</b><br><br>";

  for await (const doc of entries) {
    html_string = html_string + `
    <b>${doc.animal.name}</b>
    <br>
    ${doc.content}
    <br>
    <br>
    `
  }

  return html_string;

}

async function generate_text_for_daily_update_email(entries){
  var html_string = "Daily Update\n\n";

  for await (const doc of entries) {
    html_string = html_string + `
    ${doc.animal.name}
    \n
    ${doc.content}
    \n\n
    `
  }

  return html_string;

}

async function get_todays_activities(){

  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  const entries = await EntryModel.find({
      createdAt: {
          $gte: startOfDay,
          $lt: endOfDay
      }
  }).populate('animal');

  return entries;

}


async function send_daily_update_email(user){
  //console.log("send_daily_update_email");

  const entries_today = await get_todays_activities();
  const html_string = await generate_html_for_daily_update_email(entries_today);
  const text_string = await generate_text_for_daily_update_email(entries_today);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.oriented.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sandro.raess@philosophie.ch', // generated ethereal user
      pass: process.env.orientedEmailPassword, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Sandro Räss" <sandro.raess@philosophie.ch>', // sender address
    to: user.email, // list of receivers
    subject: "Stinah-Diary - Daily Update", // Subject line
    text: text_string, // plain text body
    html: html_string, // html body
  });

}
