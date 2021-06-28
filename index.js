const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer((req, res) => {
    const q = url.parse(req.url, true);
    const filename = '.' + q.pathname;

    if (filename == './') {
      fs.readFile('./index.html', (err, data) => {
        if (err) {
          console.error(err);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
    } else {
      fs.readFile(filename, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          return res.end('404 Not Found');
          // fs.readFile('./404.html', (anotherError, data) => {
          //   if (anotherError) {
          //     console.error(anotherError);
          //   }
          //   res.writeHead(404, { 'Content-Type': 'text/html' });
          //   res.write(data);
          //   return res.end('AAAA');
          // });
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);
