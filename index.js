var http = require("http");
let url = require("url");
let fs = require("fs");

http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename =
      q.pathname === "/" ? "index" : q.pathname.replace(".html", "");
    if (filename.indexOf("/") !== -1) {
      filename = filename.replace("/", "");
    }
    fs.readFile(`${filename}.html`, function (err, data) {
      if (err) {
        fs.readFile("404.html", function (err, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
