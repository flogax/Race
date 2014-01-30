var Q = require("q");
var database = require("../database");
var News = database.News;

process.on("rtc-DBOpen", function () {

    var dorpCalls = [
        Q.when(News.remove().exec())
    ];

    var newsCalls = [
        News.create({header: "Erstellung der Seite", message: "Heute ist es Soweit ich habe endlich die Zeit gefunden " +
            "diese seite anzufangen und mein Projekt weiter zu führen, zuerste einmal nur das Grund gerüßt angefangen ", date: new Date("2014-01-28")}),
        News.create({header: "Schritt2 DB erstellen", message: "Schritt 2 war die Datenbank erstellen für die späteren" +
            " User und News die kommen werden außerdem muss man ja auch die Karten und Decks irgendwo speichern", date: new Date("2014-01-29")}),
        News.create({header: "Test daten für die Daten Bank", message: "Diese 3 News sind meine ersten 3 Test daten die " +
            "ich erstellt haben mal schauen wie die nächsten aus sehen ", date: new Date("2014-01-30")})
    ];

    Q.all(dorpCalls)
        .then(function () {
            return Q.all(newsCalls);
        }).then(function (results) {
            console.log(results[0]);
            console.log(results[1]);
            console.log(results[2]);
            console.log("### Ende ###");
        });
});