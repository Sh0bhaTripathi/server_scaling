const cluster = require('cluster');
const http    = require('http');
var  express  = require('express');
const numCPUs = require('os').cpus().length;

const app  = express();
app.server = http.createServer(app);

//Route setup
var router = express.Router();
app.use('', router);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    //To handle zero downtime
    console.log('Starting a new worker');
    cluster.fork(); 
  });
} else {
   
  // Workers can share any TCP connection
  app.listen(3000, ()=> {
    let message = `Worker : ${process.pid} started`
    console.log(message)
    require('./routes/route.js')(app.server, router);
  })
}


