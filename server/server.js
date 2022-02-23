const http = require("http");
const config = require("../config")
const port = config.serverPort;
const url = require("url");
const qs = require("querystring");
const path = require("path");
const fs = require("fs");
const { send } = require("process");

const root = __dirname + "/files";

let data = {
  0: {
    id: 0,
    modul: "Webtechnologien",
    prof: "Axel Küpper",
    ects: 6,
  },
  1: {
    id: 1,
    modul: "Spanish Cuisine",
    prof: "Umberto del Casa",
    ects: 3,
  },
};

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let method = req.method;
    let query = url.parse(req.url, true).query;
    let body = "";

    console.log(
      "method : " +
        method +
        ", query : " +
        JSON.stringify(query) +
        ", url : " +
        req.url
    );
    // TODO: implement me

    switch (method) {
      case "OPTIONS":
        // mit writeHead() wird der Header des HTTP-Responses definiert
        res.writeHead(204, { Allow: "OPTIONS, GET, POST, PUT, DELETE" });
        // mit end() wird der HTTP-Response abgeschlossen und verschickt
        res.end();
        break;
      case "GET":
        var directoryPath = path.join(root, req.url);
        let accumulator = [];
        console.log("URL : " + req.url[req.url.length - 1]);
        if (!isDirReq(req.url)) {
          console.log("GET DIR");
          fs.readFile(directoryPath, "utf8", (err, data) => {
            if (err) {
              console.log(err);
              sendResponse(404, "no such file ", res);
              return;
            } else {
              accumulator = data;
              console.log("read Data : " + data);
              console.log(accumulator);
              sendResponse(200, accumulator, res);
            }
          });
        } else {
          fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
              sendResponse(404, "No such folder or directory ", res);
              return console.log("52 : Unable to scan directory: " + err);
            }

            //listing all files using forEach
            files.forEach(function (file) {
              let line = { path: file };
              try {
                line["type"] = fs
                  .lstatSync(path.join(directoryPath, file))
                  .isDirectory()
                  ? "directory"
                  : "file";
              } catch (err) {
                return console.log("62 : Unable to scan directory: " + err);
              }

              accumulator.push(line);
            });
            console.log(accumulator);
            sendResponse(200, accumulator, res);
          });
        }
        break;
      case "POST":
        body = "";
        dir = path.join(root, req.url);
        console.log("101 : " + dir);
        // der Request-Body muss stückchenweise gelesen und zusammengesetzt werden (asynchron)
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        // 'end' signalisiert das Ende vom Request-Body, jetzt kann damit gearbeitet werden
        req.on("end", () => {
          if (isDirReq(req.url)) {
            sendResponse(400, "No file to create", res);
          } else {
            if (fs.existsSync(dir)) {
              sendResponse(400, "File already exists", res);
            } else {
              if (!fs.existsSync(path.dirname(dir))) {
                fs.mkdirSync(
                  path.dirname(dir),
                  { recursive: true },
                  (error) => {
                    if (error) {
                      sendResponse(400, error, res);
                    }
                  }
                );
              }
              fs.writeFile(dir, body, { recursive: true }, (error) => {
                if (error) {
                  sendResponse(400, error, res);
                } else {
                  sendResponse(200, body, res);
                }
              });
            }
          }
        });
        break;
      case "PUT":
        dir = path.join(root, req.url);
        body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          if (!fs.existsSync(dir)) {
            sendResponse(404, "File not found", res);
          } else {
            fs.writeFile(dir, body, { recursive: true }, (error) => {
              if (error) {
                sendResponse(400, error, res);
              } else {
                sendResponse(200, body, res);
              }
            });
          }
        });
        break;
      case "DELETE":
        dir = path.join(root, req.url);
        console.log("147 : " + dir);
        body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          if (isDirReq(req.url)) {
            if (!fs.existsSync(dir)) {
              sendResponse(404, "Path not found", res);
            } else {
              fs.rmdir(dir, { recursive: true }, (err) => {
                if (err) {
                  sendResponse(404, err, res);
                }
                sendResponse(200, "DELETED", res);
                console.log(`${dir} is deleted!`);
              });
            }
          } else {
            if (!fs.existsSync(dir)) {
              sendResponse(404, "Path not found", res);
            } else {
              fs.unlink(dir, (err) => {
                if (err) {
                  sendResponse(404, err, res);
                }
                sendResponse(200, "DELETED", res);
                console.log(`${dir} is deleted!`);
              });
            }
          }
        });
        break;
    }
  })
  .listen(port);

function sendResponse(status, message, res) {
  res.writeHead(status, { "Content-Type": "text/json" });
  res.write(typeof message === "string" ? message : JSON.stringify(message));
  res.end();
}

function isDirReq(url) {
  return url[url.length - 1] == "/";
}
