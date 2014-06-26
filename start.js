
GLOBAL.sql = require('sql');
sql.setDialect('mysql');

var express = require('express')
  , http = require('http')
  , requirejs = require('requirejs')
  , app = express()
  , mysql = require('mysql');

//setting up mysql DB

GLOBAL.db = mysql.createConnection({
  host : '10.77.50.208',
  user : 'sjren',
  password : '0412',
  database : 'interread'
});

GLOBAL.userTable = sql.define({
  name: 'users',
  columns: ['id', 'name', 'pw', 'sex', 'age', 'star', 'hobbit', 'intro', 'connection', 'bloodtype']
});

GLOBAL.bookTable = sql.define({
  name: 'book',
  columns: ['id','name','cover', 'intro', 'style', 'created_time', 'creater_id']
});

GLOBAL.teamTable = sql.define({
  name: 'team',
  columns: ['id', 'title', 'description', 'user_id']
});

db.connect();

function isEmpty(obj) {
  if(typeof obj === 'undefined') {
    return true;
  }
  if(obj === null) {
    return true;
  }
  if(typeof obj === '') {
    return true;
  }
  return false;
}

app.configure(function() {
  app.set('port', process.env.PORT || 3800);
  app.use(express.logger('dev'));
  app.use(express.static(__dirname));
  app.use(express.query());
  app.use(express.bodyParser());
  app.use(app.router);
});

app.get('/books', function(req, res) {
  var q = bookTable
    .select('*')
    .from(bookTable)
    .toQuery();
  db.query(q.text, q.values, function(err, result) {
    if(!err) {
      return res.json(result);
    }
  })
})

requirejs.config({
  baseUrl : __dirname,
  nodeRequire : require
});




http.createServer(app).listen(app.get('port'), function() {
  console.log('Server started on port: ' + app.get('port'));
});


