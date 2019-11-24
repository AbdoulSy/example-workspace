const proxy = require('express-http-proxy')
const https = require('https')
const devcert = require('devcert')
const app = require('express')()
 
const connect = async () => {
  let ssl = await devcert.certificateFor('example.local');

  https.createServer(ssl, app).listen(8080);
}

app.use('/', proxy('localhost:1234', {
    proxyReqPathResolver: function (req) {
      const parts = req.url.split('?');
      const queryString = parts[1];
      const updatedPath = parts[0].replace(/frontend/, '');

      console.log(req.url, parts, updatedPath)
      return updatedPath + (queryString ? '?' + queryString : '');
    }
  }));

app.use('/api', proxy('localhost:3001', {
    proxyReqPathResolver: function (req) {
      const parts = req.url.split('?');
      const queryString = parts[1];
      const updatedPath = parts[0].replace(/backend/, '');
      console.log(parts, updatedPath)
      return '/api' + updatedPath + (queryString ? '?' + queryString : '');
    }
  }));

connect()
