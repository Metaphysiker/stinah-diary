const express = require('express');
const router = express.Router();
const NotificationSubscriptionModel = require('../model/notification_subscription');

router.post(
  '/notification_subscriptions',
  async (req, res, next) => {
    console.log("notification_subscription");
    console.log(req);

    try {
      const notification_subscription = await NotificationSubscriptionModel.create(
        {
          endpoint: req.body.endpoint,
          auth: req.body.auth,
          p256dh: req.body.p256dh
         }
      );

      res.json(notification_subscription);
    } catch (error) {
      console.log(error);
    }

  }
);

module.exports = router;
