var Q = require("q");
var database = require("../database");

var fs = require('fs');

var News = database.News;
var User = database.User;
var Color = database.Color;
var Edition = database.Edition;
var Typ = database.Typ;
var Card = database.Card;
var Deck = database.Deck;

var edi;

process.on("rtc-DBOpen", function () {

    var dorpCalls = [
        Q.when(News.remove().exec()),
        Q.when(User.remove().exec()),
        Q.when(Color.remove().exec()),
        Q.when(Edition.remove().exec()),
        Q.when(Typ.remove().exec()),
        Q.when(Card.remove().exec())

    ];

    var newsCalls = [
        News.create({header: "Erstellung der Seite", message: "Heute ist es Soweit ich habe endlich die Zeit gefunden " +
            "diese seite anzufangen und mein Projekt weiter zu führen, zuerste einmal nur das Grund gerüßt angefangen ", date: new Date("2014-01-28")}),
        News.create({header: "Schritt2 DB erstellen", message: "Schritt 2 war die Datenbank erstellen für die späteren" +
            " User und News die kommen werden außerdem muss man ja auch die Karten und Decks irgendwo speichern", date: new Date("2014-01-29")}),
        News.create({header: "Test daten für die Daten Bank", message: "Diese 3 News sind meine ersten 3 Test daten die " +
            "ich erstellt haben mal schauen wie die nächsten aus sehen ", date: new Date("2014-01-30")})
    ];

    var usrCalls = [
        User.create({firstname: "flo", lastname: "hot", nickname: "floga1", email: "f1@h.at", role: 111, password: "pw1"}),
        User.create({firstname: "flo", lastname: "hot", nickname: "floga2", email: "f2@h.at", role: 11, password: "pw2"}),
        User.create({firstname: "flo", lastname: "hot", nickname: "floga3", email: "f3@h.at", role: 1, password: "pw3"}),
        User.create({firstname: "flo", lastname: "hot", nickname: "floga4", email: "f4@h.at", role: 110, password: "pw4"}),
        User.create({firstname: "flo", lastname: "hot", nickname: "floga5", email: "f5@h.at", role: 100, password: "pw5"}),
        User.create({firstname: "flo", lastname: "hot", nickname: "floga6", email: "f6@h.at", role: 10, password: "pw6"})
    ];

    var colorCalls = [
        Color.create({name: "green", colorCode: "#000000" }),
        Color.create({name: "red", colorCode: "#000000" }),
        Color.create({name: "blue", colorCode: "#000000" }),
        Color.create({name: "black", colorCode: "#000000" }),
        Color.create({name: "white", colorCode: "#000000" }),
        Color.create({name: "grey", colorCode: "#000000" }),
        Color.create({name: "purple", colorCode: "#000000" })
    ];

    var editionCalls = [
        Edition.create({name: "First", date: new Date("2013-09-05") })
    ];

    var typCalls = [
        Typ.create({name: "RASSE"}),
        Typ.create({name: "TRUPP"}),
        Typ.create({name: "FAHRZEUG"}),
        Typ.create({name: "ZAUBER"}),
        Typ.create({name: "WELTZAUBER"}),
        Typ.create({name: "VERTEIDIGER"}),
        Typ.create({name: "RASSEZAUBER"})
    ];

    var cardCalls = [];

    Q.all(dorpCalls)
        .then(function () {
            return Q.all(newsCalls);
        }).then(function (results) {
            console.log("### News Start ###");
            for (var i = 0; i < results.length; i++) {
                results[i].dateMeUp();
            }
            console.log("### News Ende ###");
        }).then(function () {
            return Q.all(usrCalls);
        }).then(function (results) {
            console.log("### User Start ###");
            for (var i = 0; i < results.length; i++) {
                results[i].showUserNick();
            }
            console.log("### User Ende ###");
        }).then(function () {
            return Q.all(colorCalls);
        }).then(function (results) {
            console.log("### Color Start ###");
            for (var i = 0; i < results.length; i++) {
                console.log(results[i].name);
            }
            console.log("### Color Ende ###");
        }).then(function () {
            return Q.all(editionCalls);
        }).then(function (results) {
            console.log("### Edition Start ###");
            for (var i = 0; i < results.length; i++) {
                edi = results[i];
                console.log(results[i].name);
            }
            console.log("### Editon Ende ###");
        }).then(function () {
            return Q.all(typCalls);
        }).then(function (results) {
            console.log("### Typ Start ###");
            for (var i = 0; i < results.length; i++) {
                console.log(results[i].name);
            }
            console.log("### Typ Ende ###");


        });
    /*.then(function(){

     fs.readFile(__dirname+"/cards.json",'utf8', function (err, data) {
     var jsn = JSON.parse(data);
     for(var card in jsn ){
     jsn[card].edition = edi.id;
     cardCalls.push(Card.create({name: jsn[card].name, edition: edi.id, cost: jsn[card].cost}));
     console.log(jsn[card].name);
     }
     cardCalls;

     });

     cardCalls.push(Card.create({name:'test',edition: edi.id}));
     return Q.all(cardCalls);




     }).then(function(results){
     console.log("### Card Start ###");
     for (var i = 0; i < results.length; i++) {

     console.log(results[i].name);
     }
     console.log("### Card Ende ###");
     });*/
});
