//const express = require('express')
//const app = express()
//const port = 3000

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/model');

mongoose.connect('mongodb://127.0.0.1:27017/stinah-diary');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
const animalRoute = require('./routes/animal-routes');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/stinah-diary/index.html');
})

app.use(express.static(__dirname + '/dist/stinah-diary'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/secure', passport.authenticate('jwt', { session: false }), secureRoute);


// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});
