var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();
const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb+srv://alrasheed:charlieputh22@cluster0.lxbtg3b.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'Fifth-year';

async function Connection(cookie) {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('cookies');
  const update = collection.findOneAndUpdate({}, {
    $set: {
      'cs-cookie': cookie,
    },
  },)
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult[0]['cs-cookie']);

  // the following code examples can be pasted here...

  return 'done.';
}

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

     Connection(cookies);

    res.send("Updated!");
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};
module.exports = router;