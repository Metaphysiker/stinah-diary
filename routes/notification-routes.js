const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const path = require('path');
const NotificationSubscriptionModel = require('../model/notification_subscription');



router.post(
  '/notifications/send_notification',
  async (req, res, next) => {

    const vapidKeys = { // new
      publicKey: process.env.publicKey,
      privateKey: process.env.privateKey
    };

    for await (const doc of NotificationSubscriptionModel.find({})) {
       if (doc.user.toString() === req.user_id) { continue; }
      //console.log("inside for await");

      const subscription = {
          endpoint: doc.endpoint,
          expirationTime: null,
          keys: {
              auth: doc.auth,
              p256dh: doc.p256dh,
          },
      };

      const options = {
          vapidDetails: {
              subject: 'mailto:s.raess@me.com',
              publicKey: vapidKeys.publicKey,
              privateKey: vapidKeys.privateKey,
          },
          TTL: 60,
      };


      const payload = {
          notification: {
              title: req.body.title,
              body: req.body.body,
              icon: "/icon-144x144.png",
              vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],
              actions: [
                  { action: 'bar', title: 'Focus last' },
                  { action: 'baz', title: 'Navigate last' },
              ],
              data: {
                  onActionClick: {
                      default: { operation: 'openWindow' },
                      bar: {
                          operation: 'focusLastFocusedOrOpen',
                          url: '/',
                      },
                      baz: {
                          operation: 'navigateLastFocusedOrOpen',
                          url: '/',
                      },
                  },
              },
          },
      };

      // send notification
      webpush.sendNotification(subscription, JSON.stringify(payload), options)
          .then((_) => {
              //console.log('SENT!!!');
              //console.log(_);
          })
          .catch((_) => {
              //console.log(_);

              NotificationSubscriptionModel.deleteOne({ _id: doc._id }, function (err) {
                if (err) return handleError(err);
              });

          });

    }

    res.sendStatus(200);
  }
);

module.exports = router;
