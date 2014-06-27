
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
  name: 'user',
  columns: ['id', 'name', 'pw', 'sex', 'bloodtype', 'hobit', 'star', 'users_intro', 'contect', 'created_time', 'age']
});

GLOBAL.bookTable = sql.define({
  name: 'book',
  columns: ['id','name','cover', 'style', 'introduction', 'created_time', 'creater_id']
});

GLOBAL.teamTable = sql.define({
  name: 'discuss_team',
  columns: ['id', 'title', 'discription', 'user_id']
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
  app.set('port', process.env.PORT || 3700);
  app.use(express.logger('dev'));
  app.use(express.static(__dirname));
  app.use(express.query());
  app.use(express.bodyParser());
  app.use(app.router);
});

//get list of books
app.get('/books', function(req, res) {
  var q = bookTable
    .select('*')
    .from(bookTable)
    .limit(5)
    .toQuery();
  db.query(q.text, q.values, function(err, result) {
    if(!err) {
      return res.json(result);
    }
  })
})

//get book info by id
app.get('/book/:id', function(req, res) {
  var q = bookTable
    .select('*')
    .from(bookTable)
    .where(bookTable.id.equals(req.param('id')))
    .toQuery();
  db.query(q.text, q.values, function(err, result) {
    if(!err) {
      return res.json(result);
    }
  })
})

//get all teams
app.get('/teams', function(req, res) {
  var q = teamTable
    .select('*')
    .from(teamTable)
    .limit('10')
    .toQuery();
  db.query(q.text, q.values, function(err, result) {
    if(!err) {
      return res.json(result);
    }
  })
})

//** get messages by teamId
app.get('/team/:id', function(req, res) {
  var q = teamTable
    .select('*')
    .from(teamTable)
    .where(teamTable.id.equals(req.param('id')))
    .toQuery();
  db.query(q.text, q.values, function(err, result) {
    if(!err) {
      return res.json(result);
    }
  })
})

//get

//get user's info
app.get('/user/:username', function(req, res) {
  var q = userTable
    .select('*')
    .from(userTable)
    .where(userTable.name.equals(req.param('username')))
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


