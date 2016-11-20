import express = require("express");
var bodyParser = require("body-parser");

//import routes = require('./routes/index');
//import user = require('./routes/user');
//import http = require('http');
//import path = require('path');

//var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);

//import stylus = require('stylus');
//app.use(stylus.middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

//// development only
//if ('development' == app.get('env')) {
//    app.use(express.errorHandler());
//}

//app.get('/', routes.index);
//app.get('/users', user.list);

//http.createServer(app).listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + app.get('port'));
//});

//business logic and data structures

interface IRegistration {
    salutation: string;
    name: string;
    age: number;
}

class Registration implements IRegistration {
    salutation: string;
    name: string;
    age: number;

    constructor(registration: IRegistration) {
        this.salutation = registration.salutation;
        this.name = registration.name;
        this.age = registration.age;
    }

    isValid() {
        return this.age > 18;
    }
}

var registrations = new Array<IRegistration>();

registrations.push({ salutation: "Mr", name: "Dev Hema", age: 20 },
{ salutation: "Mr", name: "Chat Sameras", age: 24 });

//setting up express
var app = express();
app.use(bodyParser());
app.use(express.static("../Client"));

// Uncommend this line to demo basic auth

// app.use(express.basicAuth((user, password) => user == "user2" && password == "password"));

//API implementation

//retrieve all registrations
app.get("/api/registrations", (req, res) => {

    res.send(registrations);
});

// Register

app.post("/api/register", (req, res) => {
    var registration = new Registration(req.body as IRegistration);
    if (registration.isValid()) {
        registrations.push(registration);
        res.send(201);
    } else {
        res.send(400);
    }
});

// Listen for HTTP traffic

app.listen(process.env.PORT || 3000);