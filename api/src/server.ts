/**
 * Module dependencies.
 */
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as errorHandler from 'errorhandler';
import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import expressValidator = require('express-validator');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// static files
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// load routes
import routes from './routes';
routes(app);

/**
 * if a request doesn't match a route, send the front app
 */
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'),
              app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

export default app;
