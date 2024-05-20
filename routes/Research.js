var express = require('express');
var router = express.Router();

const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb+srv://alrasheed:charlieputh22@cluster0.lxbtg3b.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'Fifth-year';


/* GET home page. */
router.get('/', function(req, res, next) {
// Function to make a request using the stored cookies
async function makeRequestWithCookies() {
    try {
        
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('cookies');
        const findResult = await collection.find({}).toArray();

        console.log('Found documents =>', findResult[0]['cs-cookie'][1].value);
        const response = await axios.get('https://lms.uofk.edu/course/view.php?id=3227', {
            headers: {
                Cookie: 'MoodleSession='+ findResult[0]['cs-cookie'][1].value +'; path=/; secure; SameSite=None',
            }
        });

        list = [];
        const $ = cheerio.load(response.data);
        $('.instancename').each((index, element) => {
            // Get the text content of each item
            const itemText = $(element).text().trim();
            list.push(itemText);
        });
        const arrayString = JSON.stringify(list);
        const collection2 = db.collection('lectures');
        const findResult2 = await collection2.find({title:"Research"}).toArray();
        console.log('Found documents =>', );
        const Lectures = findResult2[0].latest;
        
                // const jsonLectures = JSON.parse(Lectures);
                console.log(Lectures);
if(Lectures == arrayString){
            console.log('nothing changed');
        return [];
}
else{
    const updateIt = await collection2.findOneAndUpdate(
        { title:"Research" },
        {
          $set: {
            latest: arrayString,
          },
        }
      )
    return list;
}

    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

// Example usage
async function main() {
    try {
        // Use the cookies to make a request to a protected endpoint
       const changes = await makeRequestWithCookies();
       if(changes.length == 0){
        console.log('no change so no request')
        res.json({ title: 'no change'});
       }
       else{
        res.json({ title:  'Research Methods : New Update ' + changes[changes.length-1]});
// Sample data for the request body
const requestBody = {
    'title': 'Information Security : New Update \n' + changes[changes.length-1],
};

// Make a POST request with a body
// axios.post('https://studynotification.app.n8n.cloud/webhook/64e9e6b2-0695-415a-a82e-9e498942915f', requestBody)
//     .then(response => {
//         console.log('Response:', response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });
       }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call the main function
main();

  
});

module.exports = router;
