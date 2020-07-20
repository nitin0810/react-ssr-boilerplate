import path from 'path';
import express from 'express';
import compression from 'compression'; // compresses the response before sending
import helmet from 'helmet'; // helmet helps you secure your Express apps by setting various HTTP response headers related to security, it is not related to react-helmet
import morgan from 'morgan'; // logger middleware, logs the request's method, path, response time etc.

import { renderServerSideApp } from './renderServerSideApp';

const { PUBLIC_URL = '' } = process.env;
const { NODE_ENV } = process.env;

// This export is used by our initialization code in /scripts
export const app = express();

app.use(compression());
app.use(helmet());

// Serve generated assets (e.g JS and css files) from build folder 
// NOTE : In production, this build folder also contains the content of public folder (which is copied during build process)
app.use(
  PUBLIC_URL,
  express.static(path.resolve('./build'), {
    maxage: Infinity
  })
);

if (NODE_ENV !== 'production') {
  // Serve static assets in /public folder during development, bcz during production the content of /public is already available in /build
  app.use(
    PUBLIC_URL,
    express.static(path.resolve('./public'), {
      maxage: '30 days'
    })
  );
}

app.use(morgan('tiny'));


app.use(renderServerSideApp);
