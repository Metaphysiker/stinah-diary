require('dotenv').config();

const express = require('express');
const multer = require("multer");
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

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
const notificationRoute = require('./routes/notification-routes');
const notificationSubscriptionRoute = require('./routes/notification-subscription-routes');



app.use(fileUpload());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/stinah-diary/browser/index.html');
})

app.use(express.static(__dirname + '/dist/stinah-diary/browser'));
app.use('/uploads', passport.authenticate('jwt-from-parameter', { session: false }), express.static(__dirname + '/uploads'));
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/secure', passport.authenticate('jwt', { session: false }), animalRoute);
app.use('/secure', passport.authenticate('jwt', { session: false }), entryRoute);
app.use('/secure', passport.authenticate('jwt', { session: false }), notificationRoute);
app.use('/secure', passport.authenticate('jwt', { session: false }), notificationSubscriptionRoute);





// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});
