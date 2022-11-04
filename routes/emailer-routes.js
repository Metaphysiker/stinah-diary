const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const UserModel = require('../model/user');
const EntryModel = require('../model/entry');
const ToDoModel = require('../model/to_do');

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
    bcc: '"Sandro Räss" <sandro.raess@philosophie.ch>',
    subject: "Test-Email", // Subject line
    text: "Test Test Test", // plain text body
    html: "<b>Test Test Test?</b>", // html body
  });

}

async function generate_html_for_daily_update_email(){
  var html_string = "<b>Daily Update</b>";
  var dotted_line = "<br><br> ---------- <br><br>";


  const entries_today = await get_todays_activities();
  const entries_html_string = await generate_html_of_entries(entries_today);

  const to_dos_today = await get_todays_to_dos();
  const to_dos_html_string = await generate_html_of_to_dos(to_dos_today);

  html_string = html_string + dotted_line + entries_html_string + dotted_line + to_dos_html_string;

  return html_string;

}

async function generate_text_for_daily_update_email(){

  var text_string = "Daily Update";
  var dotted_line = "\n\n ---------- \n\n";

  const entries_today = await get_todays_activities();
  const entries_text_string = await generate_text_of_entries(entries_today);

  const to_dos_today = await get_todays_to_dos();
  const to_dos_text_string = await generate_text_of_todos(to_dos_today);

  text_string = text_string + dotted_line + entries_text_string + dotted_line + to_dos_text_string;

  return text_string;

}

async function generate_html_of_to_dos(to_dos){
  var html_string = "<b>To Dos</b><br><br>";

  for await (const doc of to_dos) {
    html_string = html_string + `
    ${doc.content}
    <br>
    Erledigt: ${doc.completed}
    <br>
    <br>
    `
  }

  return html_string;

}

async function generate_text_of_todos(to_dos){
  var html_string = "To Dos\n\n";

  for await (const doc of to_dos) {
    html_string = html_string + `
    \n
    ${doc.content}
    \n
    Erledigt: ${doc.completed}
    \n\n
    `
  }

  return html_string;

}

async function generate_html_of_entries(entries){
  var html_string = "<b>Einträge</b><br><br>";

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

async function generate_text_of_entries(entries){
  var html_string = "Einträge\n\n";

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

async function get_todays_to_dos(){

  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  const to_dos = await ToDoModel.find({
      $or: [{
        createdAt: {
            $gte: startOfDay,
            $lt: endOfDay
        }
      },
      {
        updatedAt: {
            $gte: startOfDay,
            $lt: endOfDay
        }
      }
      ]
  });

  return to_dos;

}


async function send_daily_update_email(user){

  const final_html_string = await generate_html_for_daily_update_email();
  const final_text_string = await generate_text_for_daily_update_email();

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
    bcc: '"Sandro Räss" <sandro.raess@philosophie.ch>',
    subject: "Stinah-Diary - Daily Update", // Subject line
    text: final_text_string, // plain text body
    html: final_html_string, // html body
  });

}
