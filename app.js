
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
	 res.json({"urls":["www.example.com/page1.htm","www.example.com/page2.htm","www.example.com/pagex.php"]});
});


// todo (?) use express to deal with this
function proxyError(res, message){
	res.send("Proxy error " + (message || ''),500);
}

var http = require('http');

app.get(/\/([^\/]+)(\/.*)/, function(req,res){
	
	var target_host = req.params[0],
		target_path = req.params[1];
		
	console.log("Visit: http://" + target_host + target_path)
	
	var options = {
		host: target_host,
		port: 80,
		path: target_path,
		method: req.method,
		headers: req.headers
	};
	
	http.request(options, function(subres) {
		
		//set the headers
		for(var k in subres.headers){
			res.header(k, subres.headers[k]);
		}
		
		subres.on('data', function (chunk) {
			res.write(chunk);
		}).on('end', function(chunk){
			res.end();
		}).on('error', function(error){
				proxyError(res, "(sub response) " + error.message);
		});
		
	}).on('error', function(error){
		proxyError(res, error.message);
	
	}).end();//issue the sub request
	
	
})

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
