var app = require("express")();
var handler = require("./userHandler");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var topScores = new Array();

let path = require("path");

var fs = require("fs");

var initial = 0;

app.get("/", function (req, res) {
    console.log("server successfully started");
    res.sendFile(path.resolve("RacerType.html"));
    /*
    if (initial == 0) {
        fs.writeFile("highscores.html", "", function (err) {

        });
        initial = initial + 1;
    }
    */
});

app.post("/server", function (req, res) {
    //console.log(req.body);
    if (topScores.length == 0) {
        topScores.push(req.body);
    }
    else {
        for (i=0; i<topScores.length; i++) {
            //console.log(topScores[i][1]);
            if (req.body[1] >= topScores[i][1]) {
                console.log("HERE");
                topScores.splice(i, 0, req.body);
                break;
            }
            else {

            }
        }
        /*
        for (i=0; i<topScores.length; i++) {
            console.log(topScores[i]);
        }
        */
    }


    //fs.writeFile("highscores.html", "<html> <head> <title> Highscores </title> </style>  <style> body { margin: 0; padding: 0;} div#scorelist {text-align: center; height: 100%; background-color: blue;} </style> </head> <body> <div id = "scorelist"> Test </div> </body> </html>", function (err) {
    //});
    
    fs.writeFile("highscores.html", "<html> <head> <style> body {margin: 0; padding: 0;} div#flex {display: flex; align-items: center; justify-content: center;} div#container {display: flex; background-color: red;} </style> </head> <body> <div id='flex'> <div id='fillLeft'> </div> <div id='container'> <a href='/' class='button'>Back</a> </div> <div id='fillRight'> </div> </div> <script> function init() { let container = document.getElementById('container'); function fill() {for (i=0; i<10; i++) {console.log('herrrro');}}} window.onload = init; </script> </body> </html>", function(err) {
    });

    res.status(200);
    res.end();
})

app.get("/highscores", function (req, res) {
    res.sendFile(path.resolve("highscores.html"));
})


app.listen(3000);
console.log("Listening");