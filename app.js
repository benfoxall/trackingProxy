
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

/* 
	Just use the static routing for now

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});
*/

app.get('/_', function(req,res){
	res.header('Content-type', 'application/json');
	res.send('{"urls":["www.example.com/page1.htm","www.example.com/page2.htm","www.example.com/pagex.php"]}');
})

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
