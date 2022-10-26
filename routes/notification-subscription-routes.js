const express = require('express');
const router = express.Router();
const NotificationSubscriptionModel = require('../model/notification_subscription');
const UserModel = require('../model/user');

router.post(
  '/notification_subscriptions',
  async (req, res, next) => {
    //console.log("notification_subscription");
    //console.log(req);
    //console.log(req.user._id);

    try {
      //const user = await UserModel.findOne({_id: req.user._id});
      const notification_subscription = await NotificationSubscriptionModel.create(
        {
          endpoint: req.body.endpoint,
          auth: req.body.auth,
          p256dh: req.body.p256dh,
          user: req.user._id
         }
      );

      res.json(notification_subscription);
    } catch (error) {
      console.log(error);
    }

  }
);

module.exports = router;
