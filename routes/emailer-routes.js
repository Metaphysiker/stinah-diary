const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const UserModel = require('../model/user');



router.get(
  '/emailer/:user_id',
  async (req, res, next) => {
    //req.params.user_id
    console.log(req.user);
    send_email(req.user);

    res.sendStatus(200);
  }
);


module.exports = router;

async function send_email(user){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

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
    from: '"Sandro Räss 👻" <sandro.raess@philosophie.ch>', // sender address
    to: user.email, // list of receivers
    subject: "Test-Email 👻", // Subject line
    text: "Test Test Test", // plain text body
    html: "<b>Test Test Test?</b>", // html body
  });

  //console.log("Message sent: %s", info.messageId);
  //console.log(user.email);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}
