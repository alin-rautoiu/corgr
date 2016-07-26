var dogDir = "dogs";
var basePictureUrl = 'https://raw.githubusercontent.com/alin-rautoiu/corgr/master';
var dogs = [
    {
        "id" : "0",
        "face" : "resized-0.jpg",
        "name" : "Mr. Fluffles",
        "likes" : ["Cuddles", "Chasing for pokemons"]
    },
    {
        "id" : "1",
        "face" : "resized-1.jpg",
        "name" : "Sir McDrummies",
        "likes" : ["Noms", "Squeaky toys"]
    },
    {
        "id" : "2",
        "face" : "resized-2.jpg",
        "name" : "Princess Butter",
        "likes" : ["Kisses", "Noms"]
    },
    {
        "id" : "3",
        "face" : "resized-3.jpg",
        "name" : "Duke Squiggy Derpenshire",
        "likes" : ["Rubs on the belly"]
    },
    {
        "id" : "4",
        "face" : "resized-4.jpg",
        "name" : "Doctor Bubbles",
        "likes" : ["When mommy and daddy aren't fighting"]
    },
    {
        "id" : "4",
        "face" : "resized-5.jpg",
        "name" : "Duchess Olivia",
        "likes" : ["Walkies"]
    },
    {
        "id" : "5",
        "face" : "resized-6.jpg",
        "name" : "Lady Bunnytail",
        "likes" : ["To run around sheep"]
    },
    {
        "id" : "6",
        "face" : "resized-7.jpg",
        "name" : "Miss Pickles",
        "likes" : ["To eat mommy's food when she's pretending not to look"]
    },
    {
        "id" : "7",
        "face" : "resized-8.jpg",
        "name" : "Loki",
        "likes" : ["To pretend he's a real dog."]
    }
]

var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.engine('html', require('ejs').renderFile);

function makeDogDto (element) {
    return {
               "id" : element.id,
               "pathToFace" : basePictureUrl + path.sep + dogDir + path.sep + element.face, 
               "name" : element.name, 
               "likes" : element.likes
            }
}

function makeDogsDto() {
    var allDogs = [];

    dogs.forEach(function(element) {
       allDogs.push(makeDogDto(element)); 
    }, this);
    return allDogs;
}

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/getCorgi/:id', function(req, res) {
    var id = req.params.id;

    if (dogs[id] == null) {
        res.send("No such dog!");
        return;
    }

    var dog = makeDogDto(dogs[id]);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dog));
});

app.get('/getAllCorgis/', function(req, res) {    
    var allDogs = makeDogsDto();

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

app.get('/getRandomCorgi/', function(req, res) {
    var id = Math.floor(Math.random() * dogs.length);

    if (dogs[id] == null) {
        res.send("No such dog!");
        return;
    }

    var dog = makeDogDto(dogs[id]);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dog));
});

var server = app.listen(process.env.PORT || 3002);

