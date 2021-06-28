const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = '.' + q.pathname;

  if (filename == './' || filename == './index.html') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        console.error(err);
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  } else if (filename == './about.html' || filename == './contact-me.html') {
    fs.readFile(filename, (err, data) => {
      if (err) {
        console.error(err);
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  } else {
    fs.readFile('./error.html', (err, data) => {
      if (err) {
        console.error(err);
      }
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
});

server.listen(8080, () => {
  console.log('Listening on port 8080...');
  console.log('Please open http://localhost:8080');
});
