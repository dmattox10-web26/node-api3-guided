const express = require('express'); // importing a CommonJS module
const morgan = require('morgan')
const helmet = require('helmet')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`)
  next()
}

server.use(express.json());
server.use(helmet())
//server.use(logger)
server.use(morgan('dev')) // ABOVE all routes
server.use('/api/hubs', gateKeeper('mellon'), hubsRouter);

server.get('/', logger, greeter, gateKeeper('notto'), (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.cohort} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function greeter(req, res, next) {
  req.cohort = 'Web 26'
  next()
}

function gateKeeper(req, res, next) {
  
}

function gateKeeper(guess) {
  return function(req, res, next) {
    if (req.headers.password.toLowerCase() === guess) {
      res.status(202)
      next()
    }
    else {
      res.status(401).json({you: 'shall not pass'})
    }
  }
}