// index.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Parametro ?url mancante.");
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.send(data);
  } catch (err) {
    res.status(500).send("Errore nel proxy: " + err.message);
  }
});

module.exports = app;
