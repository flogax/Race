
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var database = require('./database');

var News = database.News;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jshtml');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use('/public', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/race/*', routes.index);
app.get('/users', user.list);

app.get('/api/news', api.findAll(News));
app.get('/api/news/:id', api.find(News));
app.post('/api/news/:id', api.add(News));
app.put('/api/news/:id', api.update(News));
app.delete('/api/news/:id', api.remove(News));
app.all('/api/news', api.listMethods("GET"));
app.all('/api/news', api.listMethods("GET POST PUT DELETE"));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
