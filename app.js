var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var port = process.env.PORT || 5000;
/*//image upload
var multer  = require('multer');
var upload = multer({ dest: 'public/images/' });*/

  var mongoose = require('mongoose');

  var expressValidator = require('express-validator');


var app = express();

app.use(cors());

var server = require('http').createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



  // load required configured files =====================================================
    var configDB = require('./config/database.js');
  

  // MongDB Configuration ===============================================================
    mongoose.connect(configDB.db); // connect to our database   

  //CORS (Access-Control-Allow-Origin)  
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
  
  
  // Required models ====================================================================
  
   var number    = require('./models/number'); 

   // Required controllers ===============================================================
  var numberController = require('./controllers/numberController');

  //user api
   
    app.post('/addnumber', numberController.addnumber);
    app.get('/listAllNumbers', numberController.listAllNumbers);
    app.get('/deleteNumbers', numberController.deleteNumbers);
     //===================================ROUTES============================================
/**
   * Index.
   */
     app.get('/', function(req, res) {
          res.render('index.ejs');
        });

     app.get('/listofnumbers', function(req, res) {
          res.render('listofnumbers.ejs');
        });
  
   


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// run the server 
  server.listen(port, function () {
        console.log('Server listening at port %d ', port);
      });

module.exports = app;
