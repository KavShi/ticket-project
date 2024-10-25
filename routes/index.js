const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const tickets = require("./../src/tickets.js");
const { requiresAuth } = require('express-openid-connect');

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = {};
  data.allTickets = await tickets.showAll();
  data.isAuthenticated = req.oidc.isAuthenticated();
  data.user =  req.oidc.user;
  res.render('index', data);
});

router.get('/form', requiresAuth(), function(req, res, next) {
  let user = req.oidc.user;
  res.render('form', user);
});

router.post('/submit', requiresAuth(), upload.single('file'), function(req, res, next) {
  let user = req.oidc.user;
  const ticketNumber = Date.now();
  let lastName = null;  
  let firstName = null;
  const choice = req.body.choice;
  const title = req.body.title;
  const additionalInfo = req.body.textareaData;
  let filePath = null;

  if (!(user.given_name) || !(user.family_name)) {
    firstName = user.nickname;
  } else {
    lastName = user.family_name;
    firstName = user.given_name;
  }
  if (req.file) {
    filePath = req.file.path;
  }

  const db = req.app.get('db'); 
  const sql = `
    INSERT INTO tickets
    (
    ticketNumber,
    lastName,
    firstName,
    topic,
    title,
    additionalInfo,
    filePath
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [ticketNumber, lastName, firstName, choice, title, additionalInfo, filePath], function (err, result) {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err.stack);
      return res.status(500).send('Database Error');
    }

  res.render('result', {
    ticketNumber: ticketNumber,
    firstName: firstName,
    lastName: lastName,
    title: title,
    choice: choice,
    additionalInfo: additionalInfo,
    filePath: filePath
  });
  });
});


router.get('/ticket/:id', function(req, res, next) {
  const id = req.params.id;
  let user = req.oidc.user;
  const db = req.app.get('db');
  const sql = `
    SELECT * FROM tickets 
    WHERE ticketNumber = ?
  `;

  db.query(sql, [id], function (err, result) {
    if (err) {
      console.error('Error fetching data from MySQL: ' + err.stack);
      return res.status(500).send('Database Error');
    }
    res.render('ticket', { ticket: result[0], user: user });
  });
});

router.post('/status/:id', requiresAuth(), function(req, res, next) {
  const id = req.params.id;
  const db = req.app.get('db');
  const sql  = `
    UPDATE tickets
    SET ticketStatus = CASE WHEN ticketStatus = 1 THEN 0 ELSE 1 END
    WHERE ticketNumber = ?;
  `;

  db.query(sql, [id], function(err, result) {
    if (err) {
      console.error('Error updating data in MySQL: ' + err.stack);
      return res.status(500).send('Database Error');
    }

    res.redirect('/');
  });
});


module.exports = router;
