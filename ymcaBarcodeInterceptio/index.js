const express = require('express');
const port = 8001;
const app = express();
const bodyParser = require("body-parser");

const puppeteer = require('puppeteer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let checkedIn = [];

const generateHtml = () => {
  let html = '<!DOCTYPE html><html><head><title>Check in</title></head><body><h1>Check in</h1><form action="/list" method="post">ID: <input type="text" name="id"><input type="submit" value="Submit"></form><ul>';
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
  pushToYmca(req.body.id);
  res.set('Content-Type', 'text/html');
  res.send(generateHtml());
});

let pushToYmca;

(async () => {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:8002/list');
  pushToYmca = async (id) => {
    await page.type('input', id, { delay: 10 });
    await page.keyboard.press('Enter');
  };
})();

app.listen(port, () => console.log(`Interceptor listening on port ${port}.`));
