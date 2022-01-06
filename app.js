require('dotenv').config();

const Server = require('./models/server');


const server = new Server();

// Start server by initializing the database
server.startup();

process.on('SIGTERM', () => {
    console.log('Received SIGTERM');

    server.shutdown();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');

    server.shutdown();
});

process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);

    server.shutdown(err);
});


