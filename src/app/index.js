/** @jsx h */
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import renderToString from 'preact-render-to-string';
import {h} from 'preact';
import ClientApp from '../client/components/App';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`<DOCTYPE html>
<html>
  <head>
    <link rel="manifest" href="/manifest.json">
  </head>
  <body>
    ${renderToString(<ClientApp />)}
    ${config.scripts
      .map(script => `<script src="/${script}" defer></script>`)
      .join('\n')}
  </body>
</html>`)
});

app.post('/subscribe', (req, res) => {
  res.send('You are subscribed!');
});

export default app;
