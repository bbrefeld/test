const http = require("http");
const events = require('events');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const fs = require('fs');


// Connecting to mySQL server
const con = mysql.createConnection({
  database: "reviews",
  host: "localhost",
  user: "admin",
  password: "Paliwi-10"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database");
});

// Logging into mail server
const mailAccount = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply@brefeld-computers.com',
    pass: '5b&jMMJn4'
  },
  tls: {
        rejectUnauthorized: false
    }
});

// Form to jS object
let formObject = {};
const formSerialize = body => {
  let dataArray = body.toString().split("&");
  let objectArray = [];
  for (i=0; i < dataArray.length; i++) {
    objectArray.push((decodeURIComponent((dataArray[i].replace(/[+]/g, " ")))).split("="));
    formObject[objectArray[i][0]] = objectArray[i][1];
  };
  console.log(formObject);
}

// Get current date
let today = new Date();
const getCurrentDate = () => {
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = dd + '/' + mm + '/' + yyyy;
}

// Server logic
http.createServer(function(req, res) {

    // GET request
  if (req.method === "GET") {
    if (req.url === "/reviews") {
      con.query("SELECT * FROM reviews.reviews", function(err, result, fields) {
        if (err) throw err;

        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(result));
      });
    }
  }

    // POST request
    else if (req.method === "POST") {

    // Read datastream (request body) and put together in an array
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });

    // After receiving all data change array back to original object
    req.on('end', () => {

      // Form handling
      if (req.url === "/form") {
        formSerialize(body);

        let mailOptions = {
          from: 'noreply@brefeld-computers.com',
          to: 'info@brefeld-computers.com, ' + formObject.mail,
          subject: 'Contact Brefeld Computers',
          text: "Bedankt voor uw aanvraag \n Wij nemen zo snel mogelijk contact met u op \n \n" + formObject.message + "\n \n Met vriendelijke groet \n" + formObject.name
        };

        mailAccount.sendMail(mailOptions, function(err, info){
          if (err) {
            console.log(err);
          } else {
            console.log('Email sent');
          }
        });
        res.end();
        return;

        // Review Handling
      } else if (req.url === "/review") {
        formSerialize(body);
        getCurrentDate();

        // Data to Database
        console.log(today)
        con.query("INSERT INTO reviews.reviews (name, reviewContent, date) VALUES ?", [[[formObject.name, formObject.reviewContent, today]]], function(err, result) {
          if (err) throw err;
          con.query("SELECT * FROM reviews.reviews WHERE reviewID = " + result.insertId, function(err, createdReview, fields) {
            if (err) throw err;

            // Send back received information
            console.log(createdReview);
            res.writeHead(201, {});
            let readtest = fs.createReadStream('./index.html');
            readtest.on('open', function() {
              readtest.pipe(res)
            });
            readtest.on('error', function(err) {
              console.log(err);
              res.end(err);
            });
          });
        });
      } else {
        res.writeHead(404);
        res.end();
      };
    });
  };

}).listen(8888);
console.log("Server succesfully started");
