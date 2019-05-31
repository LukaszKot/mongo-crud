var http = require('http');
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fs = require("fs");
var path = require('path')
var _db;
var mimeTypes = {
    "js": "text/javascript",
    "css": "text/css",
    "png": "image/png",
    "jpeg": "image/jpeg",
    "mp3": "audio/mpeg",
    "gif": "image/gif"
}
var readFile = (url) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(url, function (error, data) {
            if (error) {
                reject(error)
            }
            else {
                resolve(data)
            }
        })
    })
}

mongoClient.connect("mongodb://localhost/3id2", (err, db) => {
    if (err) console.log(err);
    else console.log("mongo connected");
    _db = db;
    db.createCollection("users", function (err, coll) {
        console.log("kolekcja powstała, sprawdź w konsoli mongo")
    })
})

var getBody = (req) => {
    return new Promise((accept, reject) => {
        var allData = "";
        req.on("data", function (data) {
            allData += data;
        })
        req.on("end", function (data) {
            var value = JSON.parse(allData)
            accept(value)
        })
    })
}

var server = http.createServer((req, res) => {
    if (req.url == "/") {
        fs.readFile('static/index.html', (error, data) => {
            if (error) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        })
    }
    else if (req.url == "/users" && req.method == "POST") {
        getBody(req)
            .then(body => {

            })
    }
    else {
        readFile(path.join(__dirname, "static", decodeURI(req.url)))
            .then((data) => {
                var url = req.url.split(".")
                var extension = url[url.length - 1]
                var mimeType = mimeTypes[extension]
                res.writeHead(200, { 'Content-Type': mimeType })
                res.write(data)
                res.end();
            })
            .catch((error) => {
                res.writeHead(404, { 'Content-Type': "text/plain" });
                res.end("Eror 404: Page has not been found.")
                return;
            })
    }
})

server.listen(3000, () => {
    console.log("Server starts on port 3000.")
})