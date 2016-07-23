var dogDir = "dogs";

var dogs = [
    {
        "face" : "resized-0.jpg",
        "name" : "Mr. Fluffles",
        "likes" : "Cuddles"
    },
    {
        "face" : "resized-1.jpg",
        "name" : "Sir McDrummies",
        "likes" : "Noms"
    },
        {
        "face" : "resized-2.jpg",
        "name" : "Princess Butter",
        "likes" : "Kisses"
    },
        {
        "face" : "resized-3.jpg",
        "name" : "Duke Squiggy Derpenshire",
        "likes" : "Rubs on the belly"
    },
        {
        "face" : "resized-4.jpg",
        "name" : "Doctor Bubbles",
        "likes" : "When mommy and daddy aren't fighting"
    },
        {
        "face" : "resized-5.jpg",
        "name" : "Duchess Olivia",
        "likes" : "Walkies"
    },
        {
        "face" : "resized-6.jpg",
        "name" : "Lady Bunnytail",
        "likes" : "To run around sheep"
    },
        {
        "face" : "resized-7.jpg",
        "name" : "Miss Pickles",
        "likes" : "To eat mommy's food when she's pretending not to look"
    },
        {
        "face" : "resized-8.jpg",
        "name" : "Loki",
        "likes" : "To pretend he's a real dog."
    },
]

var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/getCorgi/:id', function(req, res) {
    var id = req.params.id;

    if (dogs[id] == null) {
        res.send("No such dog!");
        return;
    }

    var dog = {
        "pathToFace": __dirname + path.sep + dogDir + path.sep + dogs[id].face, 
        "name" : dogs[id].name, 
        "likes": dogs[id].likes
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dog));
});

app.get('/getAllCorgis/', function(req, res) {
    var id = req.params.id;

    var allDogs = [];

    dogs.forEach(function(element) {
       allDogs.push(
           {
               "pathToFace": __dirname + path.sep + dogDir + path.sep + element.face, 
               "name" : element.name, 
               "likes" : element.likes
            }); 
    }, this);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(allDogs));
});


app.get('/getCorgiFace/:id', function(req, res) {
    var id = req.params.id;

    if (dogs[id] == null) {
        res.send("No such dog!");
        return;
    }

    var img = fs.readFileSync(dogDir + path.sep + dogs[id].face);

     res.writeHead(200, {'Content-Type': 'image/jpg' });
     res.end(img, 'binary');
});

var server = app.listen(8080, function () {
    console.log("Listening");
});

