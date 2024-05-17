var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

/* GET users listing. */
router.get('/', function(req, res, next) {
(async () => {
    // Launch Puppeteer browser instance
    const browser = await puppeteer.launch({
      args:["--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"
      ],
      executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
    });
    const page = await browser.newPage();

    // Navigate to the login page
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
    console.log('Cookies Updated Successfuly!');
    // Save cookies to a file
    // fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));

    // Close the browser
    await browser.close();
})();
  res.send('coookie Update Page');
});

module.exports = router;
