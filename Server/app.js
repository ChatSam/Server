"use strict";
const express = require("express");
var bodyParser = require("body-parser");
class Registration {
    constructor(registration) {
        this.salutation = registration.salutation;
        this.name = registration.name;
        this.age = registration.age;
    }
    isValid() {
        return this.age > 18;
    }
}
var registrations = new Array();
registrations.push({ salutation: "Mr", name: "Dev Hema", age: 20 }, { salutation: "Mr", name: "Chat Sameras", age: 24 });
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
    var registration = new Registration(req.body);
    if (registration.isValid()) {
        registrations.push(registration);
        res.send(201);
    }
    else {
        res.send(400);
    }
});
// Listen for HTTP traffic
app.listen(process.env.PORT || 3000);
//# sourceMappingURL=app.js.map