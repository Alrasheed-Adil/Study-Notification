var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

/* GET users listing. */
router.get('/', function(req, res, next) {
  main(res);
});

async function main(res) {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

     // Navigate the page to a URL
     await page.goto('https://lms.uofk.edu/login/index.php');

     // Fill in the login form
     await page.type('#username', '11016950516');
     await page.type('#password', 'Charlieputh22&');
 
     // Click the login button and wait for navigation
     await Promise.all([
         page.waitForNavigation(),
         page.click('#loginbtn'),
     ]);
 
     // Wait for the login to complete (you may need to add additional checks here)
     await page.waitForSelector('#usernavigation');
 
     // Retrieve cookies
     const cookies = await page.cookies();
 
     // Save cookies to a file
     fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
     console.log('Cookies Updated!');
    res.send("Updated!");
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};
module.exports = router;