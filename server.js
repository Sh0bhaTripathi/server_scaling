const cluster = require('cluster');
const http    = require('http');
var  express  = require('express');
const numCPUs = require('os').cpus().length;

const app = express();
app.server = http.createServer(app);
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    //To handle zero downtime
    cluster.fork(); 
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(3000, ()=> {
    let message = `Worker : ${process.pid}`
    console.log(message)
  })

  console.log(`Worker ${process.pid} started`);
}