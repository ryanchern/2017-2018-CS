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
    let x = false;
    if (topScores.length == 0) {
        topScores.push(req.body);
    }
    else {
        for (i=0; i<topScores.length; i++) {
            //console.log(topScores[i][1]);
            if (req.body[1] >= topScores[i][1]) {
                x = true;
                topScores.splice(i, 0, req.body);
                break;
            }
            else {

            }
        }
        if (x == false) {
            topScores.push(req.body);
        }
        else {
            
        }

    }

    fs.writeFile("highscores.json", JSON.stringify(topScores), function(err) {

    });


    //fs.writeFile("highscores.html", "<html> <head> <title> Highscores </title> </style>  <style> body { margin: 0; padding: 0;} div#scorelist {text-align: center; height: 100%; background-color: blue;} </style> </head> <body> <div id = "scorelist"> Test </div> </body> </html>", function (err) {
    //});
    
    //fs.writeFile("highscores.html", "<html> <head> <style> body {margin: 0; padding: 0;} div#flex {display: flex; align-items: center; justify-content: center;} div#container {display: flex; background-color: red;} </style> </head> <body> <div id='flex'> <div id='fillLeft'> <a href='/' class='button'>Back</a> </div> <div id='container'> test </div> <div id='fillRight'> </div> </div> <script> function init() { {for (i=0; i<topScores.length; i++) {console.log('herrrro');}}} window.onload = init; </script> </body> </html>", function(err) {
    //});

    //res.status(200);
    //res.end();
})

app.get("/highscores", function (req, res) {
    let rawdata = fs.readFileSync(path.join(__dirname+"/highscores.json"), "utf8");
    //console.log(rawdata);
    let jsonParse = JSON.parse(rawdata);
    //console.log(jsonParse.length);
    //let page="<!DOCTYPE html><html><head><style> div#thing{position: fixed;bottom: 8px;right: 13px;font-family: fantasy;}body{background:PURPLE;margin:0px;}div:not(#thing){min-height:calc(100vh - 26px);border:8px solid PURPLE;background:#b7d2ff;margin:0px;padding:0px;padding-bottom:10px;display:flex;flex-direction:column;align-items:center;}p{font-family:\"Times New Roman\",Times,serif;font-size:130%;margin-top:5px;color:#1c0063;text-align:center;}p2{padding:0px;margin:0px;color:#1c0063;}a{color:BLACK;text-decoration:none;}</style></head><body><div>";
    let page = "<html> <head> <style> body {margin: 0; padding: 0; background: linear-gradient(to bottom, #FC466B, #3f5efb);} div#flex {display: flex; flex-direction: column; align-items: center; justify-content: center;} div#container {display: flex; flex-direction: column;} </style> </head> <body> <div id='flex'> <div id='fillLeft'> <a href='/' class='button'>Back</a> </div> <div id='container'>"
    for (i=0; i<jsonParse.length; i++) {
        console.log(jsonParse[i]);
        console.log(jsonParse[i][0]);
        console.log(jsonParse[i][1]);
        //page+="<p2>"+(jsonParse[i])+"</p2>";
        page+="<p>"+jsonParse[i][0]+"     -     "+jsonParse[i][1] + " Words per Minute" + "</p>";
      }
      page+="</div></div></body></html>";
    res.send(page);
})


app.listen(3000);
console.log("Listening");