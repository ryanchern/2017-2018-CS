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
    if (initial == 0) {
        fs.writeFile("highscores.json", "", function (err) {

        });
        initial = initial + 1;
    }
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
        
    }

    for (i=0; i<topScores.length; i++) {
        fs.writeFile("highscores.json", topScores[i], function (err) {
        }); <br/> <n/>
    }
    

    res.status(200);
    res.end();
})

app.get("/highscores", function (req, res) {
    res.sendFile(path.resolve("highscores.json"));
})


app.listen(3000);
console.log("Listening");