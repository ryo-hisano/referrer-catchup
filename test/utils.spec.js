const timeout = 5000;
let page;
const fs = require('fs');
const express = require('express');
const app = express();
let hrefs = [];
app.get('/', function(req, res) {
  fs.readFile('./dist/index.html', function(err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data, 'utf-8');
  });
});
app.use('/ref.js', express.static('./dist/ref.js'));
var server = app.listen(8888);
beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://0.0.0.0:8888/?ref1=test&ref2=bbb&utm_medium=cpc#aaaaaa');
}, timeout);

afterAll(async () => {
  await page.close();
  await server.close(function() {
    process.exit(0);
  });
});

it(
  'Change attr attribute only for domain specified by option.',
  async () => {
    hrefs = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]'), a => a.getAttribute('href')));
    expect(hrefs[0]).toBe('https://www.w3schools.com');
    expect(hrefs[1]).toBe('#top');
    expect(hrefs[2]).toBe('mailto:someone@example.com?Subject=Hello%20again');
    expect(hrefs[3]).toBe('mailto:someone@example.com?cc=someoneelse@example.com&bcc=andsomeoneelse@example.com&subject=Summer%20Party&body=You%20are%20invited%20to%20a%20big%20summer%20party!');
    expect(hrefs[4]).toBe("javascript:alert('Hello World!');");
    expect(hrefs[5]).toBe('http://www.google.co.jp/?ref1=test&ref2=bbb');
    expect(hrefs[6]).toBe('http://www.google.co.jp/?ref1=test&ref2=bbb');
    expect(hrefs[7]).toBe('https://www.google.co.jp/?ref1=test&ref2=bbb');
    expect(hrefs[8]).toBe('https://www.google.co.jp/?bbbb=uuu&ref1=test&ref2=bbb');
    expect(hrefs[9]).toBe('https://www.yahoo.co.jp/');
    expect(hrefs[10]).toBe('test.html');
  },
  timeout
);
