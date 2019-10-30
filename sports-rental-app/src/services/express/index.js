import express from 'express';
// import forceSSL from 'express-force-ssl';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler as queryErrorHandler } from 'querymen';
import { errorHandler as bodyErrorHandler } from 'bodymen';
import { env } from '../../config';
import path from 'path';

export default (apiRoot, routes) => {
  const app = express();

  /* istanbul ignore next */
  // if (env === 'production') {
  //   app.set('forceSSLOptions', {
  //     enable301Redirects: false,
  //     trustXFPHeader: true
  //   });
  //   app.use(forceSSL);
  // }

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors());
    app.use(compression());
    app.use(morgan('dev'));
  }

  app.use(express.static(path.resolve(__dirname, '../../../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../client/build/index.html'));
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());

  return app;
};
