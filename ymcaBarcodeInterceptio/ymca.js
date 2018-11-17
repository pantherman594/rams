const express = require('express');
const port = 8002;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let checkedIn = [];

const generateHtml = () => {
  let html = '<!DOCTYPE html><html><head><title>YMCA Check In</title></head><body><h1>YMCA Check In</h1><form action="/list" method="post">ID: <input type="text" name="id"><input type="submit" value="Submit"></form><ul>';
  for (let i = 0; i < checkedIn.length; i++) {
    html += `<li>${checkedIn[i]}</li>`;
  }
  html += '</body></html';
  return html;
}

app.get('/list', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(generateHtml());
});

app.post('/list', (req, res) => {
  checkedIn.push(req.body.id);
  res.set('Content-Type', 'text/html');
  res.send(generateHtml());
});

app.listen(port, () => console.log(`YMCA listening on port ${port}.`));
