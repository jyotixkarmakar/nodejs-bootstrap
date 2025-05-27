var express = require('express');
var things = require('./things.js');
var inputURL = require('./inputURL.js');
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;
console.log(`numCPUs ${numCPUs} is running`);
let i=2999;
if (cluster.isMaster) {
   console.log(`Master process ${process.pid} is running`);

   for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
   }

   cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker process ${worker.process.pid} died. Restarting...`);
      cluster.fork();
   });
} else {
   console.log("cluster"+cluster)
   const app = express();

   //To parse URL encoded data
   const logger = (req, res, next) => {
      console.log('Request received:', req.method, req.url);
      next(); // Pass control to the next middleware function
   };

   app.use(logger);
   app.get('/', function (req, res) {
      res.send("Hello!");
   });

   app.get('/hello', function (req, res) {
      res.send("Hello World!");
   });

   app.post('/hello', function (req, res) {
      res.send("You just called the post method at '/hello'!\n");
   });
   app.use('/a', function (req, res, next) {
      req.params.id = 123;
      console.log("A request for things received at " + Date.now());
      next();
   });
   app.use('/things', things);
   app.use('/a', inputURL);
   // i=Math.floor(Math.random() * (3000 - 3005 + 1) + 3000);
   i=3000
   const server = app.listen(i, () => {
      console.log(`Worker process ${process.pid} is listening on port ${i}`);
   });
}


// const http = require('http');

// const server = http.createServer((req, res) => {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello, world!\n');
// });

// server.listen(3001, () => {
//    console.log('Server running at http://localhost:3001/');
// });