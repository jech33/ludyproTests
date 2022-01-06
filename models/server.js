const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dbConfig = require('../db/config');

class Server {

    constructor() {
        // Set attributes
        this.app = express();
        this.port = process.env.PORT;

        // Routes paths
        this.usuariosPath = '/api/users';
        this.authPath = '/api/auth';        

        // Middlewares
        this.middlewares();

        // App routes
        this.routes();

        // Public directory
        this.app.use(express.static('public'));

    }

    middlewares() {
        // CORS
        this.app.use(cors());
        
        // Combines logging info from request and response
        this.app.use(morgan('combined'));
        
        // Receive and handle JSON Data
        this.app.use(express.json());
    }
    
    routes() {
        
        this.app.use(this.usuariosPath, require('../routes/users'));
        this.app.use(this.authPath, require('../routes/auth'));
        
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Rest server listening at http://localhost:${this.port}`)
        })
    }
    
    close() {
        this.app.listen().close((err) => {
            console.log("Server closed");
            process.exit(err ? 1 : 0);
        })
    }
    
    async conectarDB() {
        try {
            console.log("Initializing database connection")
            await dbConfig.initialize();
            console.log("Connected to Oracle database")
        } catch (error) {
            console.error(error);
            process.exit(1); // Non-zero failure code
        }
    }

    async connectMongo() {
        await dbConfig.mongoConnection();
    }

    async startup() {        
        // Conectar a base de datos
        await this.conectarDB();
        await this.connectMongo();
        
        // Listen server
        this.listen()
    }    

    async shutdown(e) {
        let err = e;

        console.log('Shutting down');

        try {
            console.log('Closing server');
            await this.close();

        } catch (e) {
            console.log('Encountered error', e);
            err = err || e;
        }

        try {
            console.log('Closing database module');
            await dbConfig.close();
        } catch (err) {
            console.log('Encountered error', e);
            err = err || e;
        }

        console.log('Exiting process');

        if (err) {
            process.exit(1); //  1 - Uncaught Fatal Exception: There was an uncaught exception, and it was not handled by a domain or an uncaughtException event handler.
        } else {
            process.exit(0); //  0 - Node normally exits with a 0 status code when no more async operations are pending.
        }
    }
}

module.exports = Server;