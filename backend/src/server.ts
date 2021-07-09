import { environment } from "./environments/environment";
// https://www.npmjs.com/package/express
// +   https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
import express from "express";
// https://www.npmjs.com/package/mongoose
// +   https://docs.mongodb.com/manual/reference/sql-comparison/
// +   https://docs.mongodb.com/manual/tutorial/query-documents/
import mongoose from "mongoose";
// https://www.npmjs.com/package/cors
import cors from "cors";
// https://www.npmjs.com/package/express-session
import session from "express-session";
// https://www.npmjs.com/package/connect-mongo
import MongoStore from "connect-mongo";
import { AgncyModel } from "./app/models/agncy.model";
// https://www.npmjs.com/package/gridfs-stream
const Grid = require("gridfs-stream");

// the main function
async function main() {
    // express app and router
    const app = express();
    const router = express.Router();


    // use the express router
    app.use( router );
    // use cross-origin sharing between the express backend and angular frontend (since the domains are different)
    app.use( cors() );

    // set that all requests' bodies are read as json
    app.use( express.json() );
    // enable the session store for mongodb
    app.use( session({
        store: MongoStore.create({
            mongoUrl: environment.mongoUrl,
            ttl: environment.sessionTtl,
        }),
        secret: environment.sessionSecret, // used for session encryption?
        saveUninitialized: false, // prevents an uninitialized session to be saved to the session store
        resave: false, // prevents an unmodified session (in a request) to be resaved to the session store
    }) );

    // set the mongoose promise to be the global promise
    mongoose.Promise = global.Promise;
    // set the gridfs's mongo driver to the mongoose's mongo driver
    Grid.mongo = mongoose.mongo;

    try
    {
        // wait for the connection to be established
        await mongoose.connect( environment.mongoUrl, {
            useUnifiedTopology: true,   // ???
            useNewUrlParser: true,   // the old url parser is deprecated
        });

        console.log( `[info] Open connection to MongoDB on path '${environment.mongoUrl}'` );
    }
    catch( err )
    {
        console.error( `[error] Failed to connect to MongoDB on path '${environment.mongoUrl}'`, err );
        process.kill( process.pid, 'SIGTERM' );
        return;
    }

    // omogucava cuvanje fajlova vecih od 16MB u mongo bazi
    const gfs = Grid( mongoose.connection.db );

    // pokrenuti express server na datom portu
    app.listen( environment.expressPort, () =>
        console.log(`[info] Express server running on port ${environment.expressPort}`)
    );
}

// call the main function
main();
