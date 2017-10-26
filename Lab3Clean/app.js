var app = require("express")();
var handler = require("./userHandler");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var topTen = new Array(10);

let path = require("path");


app.get("/", function(req, res) {
    console.log("server successfully started");
    res.sendFile(path.resolve("RacerType.html"));
});

app.post("/server", function(req, res) {
    console.log(req.body);

    
    topTen.push(req.body);

    console.log(topTen);

    res.status(200);
    res.end();
})

app.get("/server", function(req, res) {
    console.log("server up");
    res.sendFile(path.resolve("highscores.json"));
})


app.listen(3000);
console.log("Listening");