const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const UserModel = require('../model/user');
const EntryModel = require('../model/entry');
const ToDoModel = require('../model/to_do');
const emailer = require('../custom/emailer');


router.get(
  '/emailer/daily_update',
  async (req, res, next) => {
    //console.log("daily update");

    const filter = {};
    //const users = await UserModel.find(filter);

    for await (const doc of UserModel.find(filter)) {

      if(doc.get_daily_updates && doc.get_daily_updates === "true"){
        await emailer.send_daily_update_email(doc);
        //send_daily_update_email(doc);
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
    await emailer.send_test_email(req.user);
    //send_test_email(req.user);

    res.sendStatus(200);
  }
);

router.get(
  '/emailer/send_test_email',
  async (req, res, next) => {
    //req.params.user_id
    //console.log(req.user);
    await emailer.send_test_email(req.user);
    //send_test_email(req.user);

    res.sendStatus(200);
  }
);


module.exports = router;
