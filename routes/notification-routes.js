const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const path = require('path');


router.post(
  '/notifications/send_notification',
  async (req, res, next) => {
    console.log("req:");
    console.log(req);
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.body);

    const vapidKeys = { // new
      publicKey: process.env.publicKey,
      privateKey: process.env.privateKey
    };

    // get client subscription config from db
    const subscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/cnJUBK6Pf4k:APA91bHPtEKYLiMsDoWHOBjjcOU1518MLZ6uVQ-z4MQ_GS1oYC7C8Jp8r5svsmKTNRUhyN06118Vt5TeK1pJbtq3i09P6GRWOPUFyp86R7oCH_nzQg3Ahgqxc4JolCs0M_88rLxwVtza',
        expirationTime: null,
        keys: {
            auth: "0jqnbISegSdOBsTCh60DxQ",
            p256dh: "BEQ4x-PIPezJh9DhV-FtXQ69nmjh5VxvL5SjvQc6rimj-DRzYtrBDBjtT3rLTB8E65OG2cvGc57gMycJggvmbPU",
        },
    };

    const options = {
        vapidDetails: {
            subject: 's.raess@me.com',
            publicKey: vapidKeys.publicKey,
            privateKey: vapidKeys.privateKey,
        },
        TTL: 60,
    };

    const payload = {
        notification: {
            title: req.body.tile,
            body: req.body.body,
            //icon: path.join(__dirname, 'src/app/assets/icons/icon-144x144.png'),
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
            console.log('SENT!!!');
            console.log(_);
        })
        .catch((_) => {
            console.log(_);
        });

    res.sendStatus(200);
  }
);

module.exports = router;
