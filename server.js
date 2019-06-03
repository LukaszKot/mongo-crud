var http = require('http');
var mongoClient = require('mongodb').MongoClient;
var fs = require("fs");
var path = require('path')
var UserService = require("./services/userService.js").UserService;
var userService;
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
    userService = new UserService(db);
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
                return userService.insert(body);
            })
            .then(x => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end();
            })

    }
    else if (req.url == "/users" && req.method == "GET") {
        userService.getAll()
            .then(x => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(x));
                res.end();
            })
    }
    else if (req.url.includes("/users") && req.method == "DELETE") {
        var id = req.url.split("/").pop();
        userService.delete(id)
            .then(x => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end();
            })
    }
    else if (req.url == "/users" && req.method == "PUT") {
        getBody(req)
            .then(body => {
                userService.update(body.id, body.password)
                    .then(x => {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end();
                    })
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