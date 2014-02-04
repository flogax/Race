/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var api = require('./routes/api');
var auth = require('./auth');
var http = require('http');
var path = require('path');
var database = require('./database');

var News = database.News;
var User = database.User;

var app = express();

var sessionOptions = {
    secret: "9iabezjdon1k1co5",
    proxy: false,
    cookie: {
        maxAge: 1000 * 8640000,
        secure: true
    }
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jshtml');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session(sessionOptions));
app.use(app.router);
app.use('/public', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/race/*', routes.index);
app.get('/users', user.list);

app.post('/api/login', auth.authenticate);
app.post('/api/logout', auth.revokeAuth);
app.get('/api/ping', auth.check);

app.get('/api/news', api.findAll(News));
app.get('/api/news/:id', api.find(News));
app.post('/api/news', api.add(News));
app.put('/api/news/:id', api.update(News));
app.delete('/api/news/:id', api.remove(News));
app.all('/api/news', api.listMethods("GET POST"));
app.all('/api/news/:id', api.listMethods("GET PUT DELETE"));

app.get('/api/user', api.findAll(User));
app.get('/api/user/:id', api.find(User));
app.post('/api/user', api.add(User));
app.put('/api/user/:id', api.update(User));
app.delete('/api/user/:id', api.remove(User));
app.all('/api/user', api.listMethods("GET POST"));
app.all('/api/user/:id', api.listMethods("GET PUT DELETE"));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
