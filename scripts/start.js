/* eslint-disable no-console */
// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';
process.env.BUILD_TARGET = 'browser'; // this is used for polyfilling client side code during the development


// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

require('@babel/register')({
  plugins: [
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
        generateScopedName: '[hash:base64]'
      }
    ],
    'dynamic-import-node'
  ]
});

const path = require('path');
const express = require('express');
const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');

const { applyDevMiddleware } = require('./utils/devMiddleware');
const { purgeCacheOnChange } = require('./utils/purgeCacheOnChange');



const DEFAULT_PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;
const server = express();

// We need to "inject" the dev middleware higher up in the stack of middlewares,
// so applyDevMiddleware needs to happen before server.use()
applyDevMiddleware(server);

server.use((req, res) => {
  console.log('requiring server app');
  // We use "require" inside this function
  // so that when purgeCacheOnChange() runs we pull in the most recent code.
  // https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e
  const { app } = require('../src/server/app');
  app(req, res);
});




choosePort(HOST, DEFAULT_PORT).then(port => {
  if (!port) {
    return;
  }

  const urls = prepareUrls('http', HOST, port);

  server.listen(port, HOST, err => {
    if (err) {
      return console.log(err);
    }

    if (isInteractive) {
      clearConsole();
    }

    console.log(chalk.white('\n\tStarting dev server...'));

    openBrowser(urls.localUrlForBrowser);
    purgeCacheOnChange(path.resolve(__dirname, '../'));

    console.log(
      chalk.blue(`
        Running locally at ${urls.localUrlForBrowser}
        Running on your network at ${urls.lanUrlForConfig}:${port}
      `)
    );
  });
});
