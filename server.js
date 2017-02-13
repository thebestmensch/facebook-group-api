var express = require('express');
var passport = require('passport');

var main = require('./index');

var app = express();

app.get('/auth', passport.authenticate('facebook'));

app.get('/auth/cb',
  passport.authenticate('facebook', { failureRedirect: '/failure' }),
  (req, res) => { res.redirect('/success'); });

app.listen(3000);
