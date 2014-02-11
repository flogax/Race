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
var green, blue, red, black, white;

var trupp, rasse, fahrzeug, zauber, weltzauber, vertiediger, rassenzauber;

process.on("rtc-DBOpen", function () {

    var dorpCalls = [
        Q.when(News.remove().exec()),
        Q.when(User.remove().exec()),
        Q.when(Color.remove().exec()),
        Q.when(Edition.remove().exec()),
        Q.when(Typ.remove().exec()),
        Q.when(Card.remove().exec()),
        Q.when(Deck.remove().exec())

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
        User.create({firstname: "flo", lastname: "hot", nickname: "floga1", email: "f1@h.at", role: 'admin', password: "pw1"}),
        User.create({firstname: "flo", lastname: "hot", nickname: "floga2", email: "f2@h.at", role: 'op', password: "pw2"}),
        User.create({firstname: "flo", lastname: "hot", nickname: "floga3", email: "f3@h.at", role: 'user', password: "pw3"})

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
            blue = results[2].id;
            red = results[1].id;
            black = results[3].id;
            green = results[0].id;
            white = results[4].id;
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
            rasse = results[0];
            trupp = results[1];
            fahrzeug = results[2];
            zauber = results[3];
            weltzauber = results[4];
            vertiediger = results[5];
            rassenzauber = results[6];
        }).then(function () {
            cardCalls.push(Card.create({
                name: "Bewaffneter Codo",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 1,
                ability: "Schnell(diese Kreatur kann schon in der Runde angreifen in der sie gespielt worden ist)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Kampf Bike",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Kleiner Panzer",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Verstaerktes Bike",
                cost: 3,
                live: -1,
                atk: 0,
                ver: 2,
                ability: "Schnell(diese Kreatur kann schon in der Runde angreifen in der sie gespielt worden ist)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Panzer",
                cost: 3,
                live: -1,
                atk: 1,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Waechter",
                cost: 1,
                live: -1,
                atk: 2,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Geologe",
                cost: 1,
                live: -1,
                atk: 1,
                ver: 0,
                ability: "Wissen(Du kannst diese Karte offen als Essenz hinlegen und du bekommst statt einer Essenz, Zwei)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Scharfschuetze",
                cost: 5,
                live: -1,
                atk: 5,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Berserker",
                cost: 6,
                live: -1,
                atk: 7,
                ver: 0,
                ability: "Wenn dieser Trupp ins Spiel kommt verlieren alle gegnerischen Rassen 2 Lebenspunkte",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Larven",
                cost: -1,
                live: 15,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Skelet Pferd",
                cost: 2,
                live: -1,
                atk: 0,
                ver: 3,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Rennende Beine",
                cost: 3,
                live: -1,
                atk: 0,
                ver: 5,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Leichen Katapult",
                cost: 3,
                live: -1,
                atk: 0,
                ver: 4,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Gift Wolke",
                cost: 4,
                live: -1,
                atk: 0,
                ver: 5,
                ability: "Absprung (Wenn dieses Fahrzeug Zersoert werden wuerde, und eine Truppe gerade darauf ausgeruestet ist kannst du sie entruesten und nur das Fahrzeug stirbt)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Mit Armen",
                cost: 0,
                live: -1,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Mit Beinen",
                cost: 1,
                live: -1,
                atk: 2,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Mit Armen und Beinen",
                cost: 2,
                live: -1,
                atk: 3,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Mit Hirn",
                cost: 3,
                live: -1,
                atk: 3,
                ver: 0,
                ability: "Wissen(Du kannst diese Karte offen als Essenz hinlegen und du bekommst statt einer Essenz, Zwei)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Mit Arm, Bein und Hirn",
                cost: 5,
                live: -1,
                atk: 5,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Ratten Zombie",
                cost: -1,
                live: 15,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Riesen Blasen",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Fliegende Fische",
                cost: 4,
                live: -1,
                atk: 0,
                ver: 3,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Gesattelte Delfine",
                cost: 5,
                live: -1,
                atk: 0,
                ver: 5,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Plankton Wolke",
                cost: 6,
                live: -1,
                atk: 0,
                ver: 5,
                ability: "Wissen(Du kannst diese Karte offen als Essenz hinlegen und du bekommst statt einer Essenz, Zwei)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Gepanzerter Wahl",
                cost: 7,
                live: -1,
                atk: 0,
                ver: 6,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Wasserspucker",
                cost: 1,
                live: -1,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Dreizack Kämpfer",
                cost: 3,
                live: -1,
                atk: 2,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Assasine",
                cost: 5,
                live: -1,
                atk: 3,
                ver: 0,
                ability: "Tarnung (Wenn dieser Trupp angreift kann er nur von Einheiten mit gleicher Farbe geblockt werden)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Speerwerfer",
                cost: 6,
                live: -1,
                atk: 5,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Elementar forscher",
                cost: 7,
                live: -1,
                atk: 6,
                ver: 0,
                ability: "Wissen(Du kannst diese Karte offen als Essenz hinlegen und du bekommst statt einer Essenz, Zwei)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Leichte Blockade",
                cost: 0,
                live: -1,
                atk: 0,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: vertiediger
            }));
            cardCalls.push(Card.create({
                name: "Energiefeld",
                cost: 3,
                live: -1,
                atk: 0,
                ver: 4,
                ability: "Wissen(Du kannst diese Karte offen als Essenz hinlegen und du bekommst statt einer Essenz, Zwei)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: vertiediger
            }));
            cardCalls.push(Card.create({
                name: "Großes Schutzschild",
                cost: 5,
                live: -1,
                atk: 0,
                ver: 9,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: vertiediger
            }));
            cardCalls.push(Card.create({
                name: "Klein Wüchsige",
                cost: -1,
                live: 15,
                atk: 0,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Wandelnde Zeitbombe",
                cost: -1,
                live: 15,
                atk: 0,
                ver: 0,
                ability: "Blocker von dieser Rasse erhalten: Opfere sie füge einer Rasse deiner Wahl einen Schadenspunkt zu.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Pferde",
                cost: 2,
                live: 7,
                atk: 1,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Nashorn",
                cost: 4,
                live: 7,
                atk: 1,
                ver: 3,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Elephant",
                cost: 6,
                live: 7,
                atk: 0,
                ver: 7,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Irrlicht",
                cost: 6,
                live: 7,
                atk: 0,
                ver: 5,
                ability: "Alle Einheiten von dieser Rasse bekommen die Fähigkeit Elementar.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Sprengung",
                cost: 5,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Opfere zwei Blocker: Eine Rasse deiner Wahl Bekommt schaden in höhe der Verteidigung der niedrigsten verteidigung von den Geopferten Blockern.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Eruption",
                cost: 5,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Zu beginnt deiner Runde bekommen alle gegnerischen Rassen einen Schadenspunkt, und waehle eine Rasse die du Besitzt, diese bekommt auch einen Schadenspunkt",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: weltzauber
            }));
            cardCalls.push(Card.create({
                name: "Speerfeuer",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Waehle eine Rasse, diese bekommt 1 Schadenspunkte, wähle noch eine ander diese bekommt auch einen Schadenspunkt",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Blinder Berserker",
                cost: 1,
                live: -1,
                atk: 1,
                ver: 0,
                ability: "(2)Einmal Pro runde Kannst du 2 Essenzen zahlen dann verlieren alle Rassen 1 Lebenspunkt",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Feuer Elementare",
                cost: 5,
                live: 7,
                atk: 2,
                ver: 2,
                ability: "Immer wenn eine Truppe von dieser Rasse ins Spiel kommt, kannst du einen Rasse deiner Wahl einen Schadenspunkt zufuegen",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Orks",
                cost: 4,
                live: 7,
                atk: 1,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Goblins",
                cost: 3,
                live: 7,
                atk: 3,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Salamander",
                cost: 1,
                live: 7,
                atk: 0,
                ver: 0,
                ability: "Alle truppen von dieser Rasse koennen auch mit Fahrzeugen angreifen die noch im Bau sind",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Lebendes Gestein",
                cost: -1,
                live: 15,
                atk: 0,
                ver: 0,
                ability: "Immer wenn von dieser Rasse eine Truppe gespielt wird bekommst du eine Extra Essenz bis zum ende der Runde",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Kobolte",
                cost: 2,
                live: 7,
                atk: 2,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Echsen Menshen",
                cost: 5,
                live: 7,
                atk: 4,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Oger",
                cost: 6,
                live: 7,
                atk: 4,
                ver: 4,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Lebende Bombe",
                cost: 6,
                live: 7,
                atk: 3,
                ver: 3,
                ability: "Du kannst immer einer Rasse die du besitz einen Schadenspunkt zu fügen und eine Karte ziehen.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Opfergabe",
                cost: 3,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Opfere eine Truppe oder eine Fahrzeug, eine Rasse deiner wahl bekommt Leben in höhe der Essenzkosten der geopferten Karte.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Schießübungen",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Füge einen Schadenspunkt einer deiner Rasse zu und dann einen schaden einer Rasse deines Gegners zu, zahle eine Essenz und wiederhole diesen effeckt für jede Essenz du zahlst.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: red,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Hunde Zombie",
                cost: 1,
                live: 5,
                atk: 2,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Menschen Zombie",
                cost: 2,
                live: 5,
                atk: 2,
                ver: 3,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Elfen Zombie",
                cost: 2,
                live: 5,
                atk: 3,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Skelet Haufen",
                cost: 3,
                live: 10,
                atk: 2,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Bewegter Schleim",
                cost: 2,
                live: -1,
                atk: 0,
                ver: 2,
                ability: "Gross (Dieses Fahrzeug kann beim angreifen oder beim verteidigen bis zu zwei Truppen Tragen)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Verwesung",
                cost: 4,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Bei jedem geblockten, deiner, Angriffen bekommt die jeweils angegriffene Rasse einen Schadenspunkt.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Todesfee",
                cost: -1,
                live: 15,
                atk: 0,
                ver: 0,
                ability: "Truppen von dieser Rasse bekommen die Faehigkeit Untot(Wenn diese Karte zerstört werden würde lege sie nicht auf den Ablagestapel sondern in deinen Essenzpool)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Lebende Knochen",
                cost: 2,
                live: 7,
                atk: 1,
                ver: 4,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Verseuchte Leichen",
                cost: 2,
                live: 7,
                atk: 4,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Verfluchte Voegel",
                cost: 6,
                live: 7,
                atk: 3,
                ver: 3,
                ability: "Truppen dieser Rasse die Geblockt werden fuegen der Angegriffenen Rasse einen Schadenspunkt zu.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Zobmey Baeren",
                cost: 6,
                live: 7,
                atk: 4,
                ver: 4,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Geister Schlag",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Der schaden der ausgewaehlten Einheite wird auch der angegriffenen Rasse zugefuegt.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Leichen Geruch",
                cost: 4,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Der Schaden der ausgewaehlten angreifenden Einheit wird bis zum ende deiner runde verdoppelt, wenn sie geblockt wird bekommt die angegriffene Rasse die haefte des verursachten schadens.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Beruehrung der Todesfee",
                cost: 1,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Ein Fahrzeug oder eine Truppe deiner Wahl bekommt Untod bis zum ende der Runde.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: black,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Wasser Elementar",
                cost: -1,
                live: 15,
                atk: 0,
                ver: 0,
                ability: "Jede Trupp von dieser Rasse bekommt die fähigkeit Elementar (Diese karte prouziert solange sie im spiel ist eine Essenz, Beginent ab der nächsten Runde, nach dem ausspielen)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Essenzwissen",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Fülle deine Essenzvorrat wieder auf und füge noch 2 hinzu.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Wissenschaft",
                cost: 4,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Jede Karte die du offen als Essenz spielst besitzt die fähigkeit Wissen(Du kannst diese Karte offen als Essenz hinlegen und du bekommst statt einer Essenz, Zwei)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: weltzauber
            }));
            cardCalls.push(Card.create({
                name: "Meermenschen",
                cost: 6,
                live: 7,
                atk: 4,
                ver: 4,
                ability: "Jedes mal wenn von dieser Rasse ein Trupp gespielt wird kannst du eine Karte ziehen.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Delfine",
                cost: 5,
                live: 7,
                atk: 4,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Wasser Schlangen",
                cost: 4,
                live: 7,
                atk: 2,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Fische",
                cost: 3,
                live: 7,
                atk: 2,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Lebende Partikel",
                cost: -1,
                live: 15,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Regenbogen Fische",
                cost: 2,
                live: 7,
                atk: 1,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Fischmenschen",
                cost: 6,
                live: 7,
                atk: 4,
                ver: 4,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Manta Rochen",
                cost: 6,
                live: 7,
                atk: 5,
                ver: 3,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Nagar",
                cost: 8,
                live: 10,
                atk: 5,
                ver: 5,
                ability: "Ziehe eine Karte mehr Pro Runde",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Essenz Schild",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Verhindere so viel schaden wie Essenzen du pro Runde Produzierst.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Einweg Technologie",
                cost: 3,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Eine deiner Einheiten bekommt die Faehigkeit Tarnung bis zum ende der Runde.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: blue,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Raumschiff",
                cost: 2,
                live: -1,
                atk: 0,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Flugzeug",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 1,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Leichte Kampfeinheit",
                cost: 1,
                live: -1,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Schwere Kampfeinheit",
                cost: 2,
                live: -1,
                atk: 2,
                ver: 0,
                ability: "Immer wenn diese Truppe blockt bekommt sie +0/+2",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Blockade",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 3,
                ability: "Recycling1(Wenn diese Einheit sterben würde kannst du 1 Essenz zahlen und entscheiden: Ziehe eine Karte, oder lege diese statt in den Ablagestapel in deinen Essenzpool)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: vertiediger
            }));
            cardCalls.push(Card.create({
                name: "Schutz Schild",
                cost: 2,
                live: -1,
                atk: 0,
                ver: 4,
                ability: "Recycling1(Wenn diese Einheit sterben würde kannst du 1 Essenz zahlen und entscheiden: Ziehe eine Karte, oder lege diese statt in den Ablagestapel in deinen Essenzpool)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: vertiediger
            }));
            cardCalls.push(Card.create({
                name: "Stachel Blockade",
                cost: 4,
                live: -1,
                atk: 0,
                ver: 5,
                ability: "Jeder Kampfschaden der dieser Blockade zugefügt wird, auch der geblockten Rasse, zur hälfte, zugefügt.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: vertiediger
            }));
            cardCalls.push(Card.create({
                name: "Verstoßene",
                cost: 2,
                live: 7,
                atk: 0,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Menschen",
                cost: 3,
                live: 7,
                atk: 0,
                ver: 3,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Manipulierter Mensch",
                cost: 4,
                live: 7,
                atk: 0,
                ver: 4,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Lichtwesen",
                cost: 6,
                live: 7,
                atk: 0,
                ver: 4,
                ability: "Einheiten die von dieser Rasse gespielt werden verhindern 1 Schadenspunkt von dem schaden den sie bekommen und die gleiche Menge kann auch einer Rasse deiner Wahl zugefügt werden.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Reflektion",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Die ausgewählte Einheite bekommt +0/+2 bis zum Ende der Runde und wenn sie schaden bekommt, dann wird 1 Schadenspunkt der Rasse die der Einheit schaden gemacht hat zugefügt.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Verbesserte Blockaden",
                cost: 5,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Immer wen ein Blocker, blockt bekommt die geblockte Rasse einen Schadenspunkt.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: weltzauber
            }));
            cardCalls.push(Card.create({
                name: "Tarnkappen Träger",
                cost: 2,
                live: -1,
                atk: 1,
                ver: 0,
                ability: "Tarnung(Diese Truppe kann nur von einer Einheit der selben Farbe geblockt werden.)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Fliegendes Wasser",
                cost: 2,
                live: -1,
                atk: 2,
                ver: 2,
                ability: "(Drehe sie um) Zahle 1 Essenz verhindere 4 Schadenspunkte die einer Rasse zugefügt werden würde.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: vertiediger
            }));
            cardCalls.push(Card.create({
                name: "Mienen Feld",
                cost: 3,
                live: -1,
                atk: 4,
                ver: 1,
                ability: "(Drehe sie um) Zahle 3 Essenzen füge einer angreiftenten Rasse einen Schadenspunkt zu.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: vertiediger
            }));
            cardCalls.push(Card.create({
                name: "Recycling Anlage",
                cost: 4,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Alle Blockaden bekommen Recycling2\r\r\n\t\t\t\t(Wenn diese Einheit sterben würde kannst du 2 Essenz zahlen und entscheiden: Ziehe eine Karte, oder lege diese statt in den Ablagestapel in deinen Essenzpool)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: weltzauber
            }));
            cardCalls.push(Card.create({
                name: "Wieder Verwertung",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Bringe 2 Blockaden aus dem Ablagestapel wieder auf deine Hand zurück.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Spiegel Kabinett",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Schaden der angreifenten Einheit füg sie sich selber zu.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: white,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Bewaffnete Boa",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Wachsende Wurzeln",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 1,
                ability: "Wissen(Du kannst diese Karte offen als Essenz hinlegen und du bekommst statt einer Essenz, Zwei)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Riesiger Greif",
                cost: 2,
                live: -1,
                atk: 0,
                ver: 3,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Wandernder Wald",
                cost: 3,
                live: -1,
                atk: 0,
                ver: 5,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Magische Flammen",
                cost: 5,
                live: -1,
                atk: 1,
                ver: 6,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: fahrzeug
            }));
            cardCalls.push(Card.create({
                name: "Leichte Nahkaempfer",
                cost: 1,
                live: -1,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Heiler",
                cost: 1,
                live: -1,
                atk: 0,
                ver: 0,
                ability: "Die Rasse von dem dieser Trupp erzeugt wird bekommt einen Lebenspunkt",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Fernkaempfer",
                cost: 2,
                live: -1,
                atk: 2,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Schwerbewaffnetetruppe",
                cost: 5,
                live: -1,
                atk: 4,
                ver: 1,
                ability: "Maechtiger schaden(Wenn diesr Trupp einem Fahrzeug schaden zufuegt, der ueber den verteidigungswert des Verteigigenden Fahrzugst liegt wird die differenz noch einer Rasse als schaden zugefuegt)",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Fee",
                cost: -1,
                live: 15,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Ueberwuchs",
                cost: 4,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Solange diese Karte im Spiel ist bekommen alle Fahrzeuge +1 auf ihren Verteidigungswert und alle Truppen +1 auf ihren Angriffswert.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: weltzauber
            }));
            cardCalls.push(Card.create({
                name: "Pflanzliches Dopping",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Einer Truppe deiner wahl bekommt +2/+2 bis zum Ende des Zuges",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Kommander",
                cost: 4,
                live: -1,
                atk: 2,
                ver: 0,
                ability: "(2)Einmal Pro Runde kannst du 2 Essenzen bezahlen dann bekommen alle Fahrzeuge und Truppen +1/+1 bis zum ende der Runde",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: trupp
            }));
            cardCalls.push(Card.create({
                name: "Lebendes Wasser",
                cost: -1,
                live: 15,
                atk: 0,
                ver: 0,
                ability: "Truppen von dieser Rasse haben: Opfer diese Truppe eine Rasse deiner Wahl bekommt einen Lebendspunkt.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Wandernde Baueme",
                cost: 4,
                live: 7,
                atk: 0,
                ver: 4,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Schlammwesen",
                cost: 6,
                live: 7,
                atk: 5,
                ver: 2,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Riesen Schlammwesen",
                cost: 6,
                live: 7,
                atk: 3,
                ver: 3,
                ability: "Truppen von dieser Rasse bekommen Mächtiger Schaden.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Uralter Baum",
                cost: 8,
                live: 7,
                atk: 5,
                ver: 5,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Modernisierung",
                cost: 2,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Die ausgewählte Einheit bekommt +4/+0 bis zum ende der Runde.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Wirkungsvolle Rede",
                cost: 4,
                live: -1,
                atk: -1,
                ver: -1,
                ability: "Alle deine Einheiten bekommen +2/+2 bis zum ende der Runde.",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: zauber
            }));
            cardCalls.push(Card.create({
                name: "Elfen",
                cost: 3,
                live: 7,
                atk: 3,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Wald Geister",
                cost: 5,
                live: 7,
                atk: 3,
                ver: 1,
                ability: "Immer wenn von dieser Rasse einer Truppe ins Spiel kommt bekommt eine Rasse deiner Wahl einen Lebenspunkt",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Leoparden",
                cost: 2,
                live: 7,
                atk: 2,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            cardCalls.push(Card.create({
                name: "Wolf",
                cost: 1,
                live: 7,
                atk: 1,
                ver: 0,
                ability: "",
                hidden: true,
                version: 0.1,
                edition: edi.id,
                color: green,
                typ: rasse
            }));
            return Q.all(cardCalls);
        }).then(function (results) {
            console.log("### Card Start ###");
            for (var i = 0; i < results.length; i++) {
                console.log(results[i].name);
            }
            console.log("### Card Ende ###");
        });


});
