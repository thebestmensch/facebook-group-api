var json2csv = require('json2csv');
var fs = require('fs');
var graph = require('fbgraph');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = process.argv[2];
var FACEBOOK_APP_SECRET = process.argv[3];
var INPUT_PATH = process.argv[4];
var OUTPUT_FIELDS = process.argv[5] || ['id'];
var OUTPUT_PATH = process.argv[6] || './output.csv';

exports.auth = passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/cb',
}, (accessToken, refreshToken, profile, cb) => {
  graph.setAccessToken(accessToken);

  getAll({ path: INPUT_PATH })
    .then((data) => out(data))
    .then(() => cb('success'))
    .catch((err) => cb(err));
}));

var getAll = (args) => {
  return new Promise((resolve, reject) => {
    var cb = (data) => resolve(data);
    return get(args, cb);
  });
};

// args: { path, data, after };
var get = (args, cb) => {
  args.data = args.data || [];
  args.after = args.after || '';

  graph.get(args.path, { limit: 500, after: args.after }, (err, res) => {
    res.data = res.data || [];
    res.data.forEach((mem) => mem.group = args.group);
    args.data = args.data.concat(res.data);
    if (res.paging && res.paging.next) {
      args.after = res.paging.cursors.after;
      return get(args, cb);
    } else {
      cb(args.data);
    }
  });
};

var out = (data) => {
  return new Promise((resolve, reject) => {
    var fields = OUTPUT_FIELDS;
    var result = json2csv({ data, fields });

    fs.writeFile(OUTPUT_PATH, result, (err) => {
      if (err) { reject(err); }
      resolve(true);
    });
  });
};
