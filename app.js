/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var auth = require('./auth');
var http = require('http');
var path = require('path');
var database = require('./database');

var News = database.News;
var User = database.User;
var Card = database.Card;
var Deck = database.Deck;
var Typ = database.Typ;
var Color = database.Color;
var Edition = database.Edition;

var app = express();

var sessionOptions = {
    secret: "9iabezjcon1k3co6",
    proxy: false,
    cookie: {
        maxAge: 1000 * 8640000,
        secure: false
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
//Login Service
app.post('/api/login', auth.authenticate);
app.post('/api/logout', auth.revokeAuth);
app.get('/api/ping', auth.check);

//News Service
app.get('/api/news', api.findAll(News));
app.get('/api/news/:id', api.find(News));
app.post('/api/news', api.add(News));
app.put('/api/news/:id', api.update(News));
app.delete('/api/news/:id', api.remove(News));
app.all('/api/news', api.listMethods("GET POST"));
app.all('/api/news/:id', api.listMethods("GET PUT DELETE"));

//User Service
app.get('/api/user', api.findAll(User, 'card decks'));
app.get('/api/user/:id', api.find(User, 'card decks'));
app.post('/api/user', api.add(User));
app.put('/api/user/:id', api.update(User, 'card decks'));
app.delete('/api/user/:id', api.remove(User));
app.all('/api/user', api.listMethods("GET POST"));
app.all('/api/user/:id', api.listMethods("GET PUT DELETE"));

//Card Service
app.get('/api/card', api.findAll(Card, 'typ edition color'));
app.get('/api/card/:id', api.find(Card, 'typ edition color'));
app.post('/api/card', api.add(Card));
app.put('/api/card/:id', api.update(Card, 'typ edition color'));
app.delete('/api/card/:id', api.remove(Card));
app.all('/api/card', api.listMethods("GET POST"));
app.all('/api/card/:id', api.listMethods("GET PUT DELETE"));

//Deck Service
app.get('/api/deck', api.findAll(Deck, 'user card'));
app.get('/api/deck/:id', api.find(Deck, 'user card'));
app.post('/api/deck', api.add(Deck));
app.put('/api/deck/:id', api.update(Deck, 'user card'));
app.delete('/api/deck/:id', api.remove(Deck));
app.all('/api/deck', api.listMethods("GET POST"));
app.all('/api/deck/:id', api.listMethods("GET PUT DELETE"));

//Color Service
app.get('/api/color', api.findAll(Color));

//Typ Service
app.get('/api/typ', api.findAll(Typ));

//Edition Service
app.get('/api/edition', api.findAll(Edition));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
