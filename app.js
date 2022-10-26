require('dotenv').config();

const express = require('express');
const multer = require("multer");
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const webpush = require('web-push');

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

const payload = {
    notification: {
        title: 'Title',
        body: 'This is my body',
        icon: 'assets/icons/icon-384x384.png',
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

const options = {
    vapidDetails: {
        subject: 'mailto:example_email@example.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey,
    },
    TTL: 60,
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

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const UserModel = require('./model/user');
const AnimalModel = require('./model/animal');
const EntryModel = require('./model/entry');
const FileModel = require('./model/file');

mongoose.connect('mongodb://127.0.0.1:27017/stinah-diary');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
const animalRoute = require('./routes/animal-routes');
const entryRoute = require('./routes/entry-routes');

app.use(fileUpload());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/stinah-diary/browser/index.html');
})

app.use(express.static(__dirname + '/dist/stinah-diary/browser'));
app.use('/uploads', passport.authenticate('jwt-from-parameter', { session: false }), express.static(__dirname + '/uploads'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/secure', passport.authenticate('jwt', { session: false }), animalRoute);
app.use('/secure', passport.authenticate('jwt', { session: false }), entryRoute);



// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});
