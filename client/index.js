var express = require('express');
var bodyParser = require('body-parser');
var cookiesParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('view', './view');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index', {
    name: 'AAA'
  });
});

app.use('/users', userRoute);
app.use('/auth', authRoute);

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});