var express = require('express');
var router = express.Router();

const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');



/* GET home page. */
router.get('/', function(req, res, next) {

  
// async function main() {
//   try {
//       // Use the cookies to make a request to a protected endpoint
//      const changes = await makeRequestWithCookies();
//      if(changes.length == 0){
//       console.log('no change so no request');
//       res.json({ title:  'no change'});
//      }
//      else{

//       console.log('Second Condition!')
//       res.json({ title:  'Research Methods : New Update ' + changes[changes.length-1]});
// // Sample data for the request body
// // const requestBody = {
// //   'title': 'Research Methods : New Update \n' + changes[changes.length-1],
// // };

// // // Make a POST request with a body
// // axios.post('https://studynotification.app.n8n.cloud/webhook/64e9e6b2-0695-415a-a82e-9e498942915f', requestBody)
// //   .then(response => {
// //       // console.log('Response:', response.data);
// //   })
// //   .catch(error => {
// //       console.error('Error:', error.message);
// //   });
//      }
//   } catch (error) {
//       console.error('An error occurred:', error);
//   }
// }

// async function makeRequestWithCookies() {
//   try {
//       const data = fs.readFileSync('cookies.json', 'utf8');
//       const jsonData = JSON.parse(data);
//       const response = await axios.get('https://lms.uofk.edu/course/view.php?id=3227', {
//           headers: {
//               Cookie: 'MoodleSession='+ jsonData[1].value+'; path=/; secure; SameSite=None',
//           }
//       });

//       list = [];
//       const $ = cheerio.load(response.data);
//       $('.sectionname').each((index, element) => {
//           // Get the text content of each item
//           const itemText = $(element).text().trim();
//           list.push(itemText);
//       });
//       const arrayString = JSON.stringify(list);

// // Write the array data to a file

// const Lectures = fs.readFileSync('Lectures.json', 'utf8');
//       // const jsonLectures = JSON.parse(Lectures);
//       console.log(Lectures);
// if(Lectures == arrayString){
//           console.log('nothing changed');
//       return [];
// }
// else{
//   fs.writeFile('Lectures.json', arrayString, 'utf8', (err) => {
//       if (err) {
//           console.error('Error writing to file:', err);
//           return;
//       }
//       console.log('Array data saved to file successfully.');
      
//   });
//   return list;
// }

//   } catch (error) {
//       console.error('Request failed:', error);
//       throw error;
//   }
// }

// // Call the main function
// main();
  res.render('index', { title: 'Express' });
});


module.exports = router;
