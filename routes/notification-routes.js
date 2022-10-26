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
              icon: "https://cdn-icons-png.flaticon.com/512/3449/3449752.png",
              actions: [
                  { action: 'bar', title: 'Focus last' },
                  { action: 'baz', title: 'Navigate last' },
              ],
              data: {
                  onActionClick: {
                      default: { operation: 'openWindow' },
                      bar: {
                          operation: 'focusLastFocusedOrOpen',
                          url: '/signin',
                      },
                      baz: {
                          operation: 'navigateLastFocusedOrOpen',
                          url: '/signin',
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
                // deleted at most one tank document
              });

          });

    }

    res.sendStatus(200);
  }
);

module.exports = router;
