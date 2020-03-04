const express = require('express');
const https = require('https');
const next = require('next');
const open = require('open');
const path = require('path');
const httpsLocalhost = require('https-localhost')();

const { devProxy } = require('./proxy');

const PORT = process.env.PORT || 3443;

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

const main = async () => {
  await app.prepare();

  const server = express();

  app.setAssetPrefix(process.env.STATIC_PATH);

  server.use(express.static(path.join(__dirname, '../static')));

  if (process.env.PROXY_MODE === 'local') {
    const proxyMiddleware = require('http-proxy-middleware');
    Object.keys(devProxy).forEach((context) => {
      server.use(proxyMiddleware(context, devProxy[context]));
    });
  }

  const handler = app.getRequestHandler();

  server.get('*', (req, res) => {
    return handler(req, res);
  });

  const certs = await httpsLocalhost.getCerts();

  await new Promise((resolve, reject) =>
    https
      .createServer(certs, server)
      .listen(PORT, (err) => (err ? reject(err) : resolve()))
  );

  const localUrl = `https://localhost:${PORT}`;

  console.log(`>>> Ready on ${localUrl}`);

  await open(localUrl);
};

main()
  .then(() => {})
  .catch((e) => console.error(e));
