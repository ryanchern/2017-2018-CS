var app = require("express")();
var handler = require("./userHandler");

let path = require("path");


app.get("/", function(req, res) {
    res.sendFile(path.resolve("RacerType.html"));
});

app.listen(3000);
console.log("Listening");