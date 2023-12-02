const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb();
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
recordRoutes.route("/record/login").post(function (req, res) {
  let db_connect = dbo.getDb();
  
  db_connect.collection("users")
      .findOne({ email: req.body.email })
      .then(existingUser => {

          if (!existingUser) {
            res.status(201).json({ message: 'Account with this email does not exist.' });;
          }
          else {
            if (req.body.password !== existingUser.password) {
              res.status(202).json({ message: "Incorrect Password" });
            }
            else {
              const responseData = {
                message: 'User signed in successfully',
                username: existingUser.username
              };
              res.status(200).json(responseData);
            }
          }
      })
      .catch(error => {
          console.error("Error finding user:", error);
          res.status(500).json({ error: 'Internal Server Error' });
      });

 });

 recordRoutes.route("/record/create-message").post(async function (req, res) {
  try {
    let db_connect = dbo.getDb();
    let messageObj = {
      chatroomId: req.body.chatroomId,
      text: req.body.text
    };

    const messagesCollection = db_connect.collection('messages');

    // Insert the messageObj into the "messages" collection
    const result = await messagesCollection.insertOne(messageObj);

    res.status(200).json({ message: 'Message created successfully' });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

recordRoutes.route("/record/get-messages/:id").get(async function (req, res) {
  try {
    let db_connect = dbo.getDb();
    const chatroomId = req.params.id;

    const messagesCollection = db_connect.collection('messages');
    const result = await messagesCollection.find({ chatroomId: chatroomId }).toArray();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

 
recordRoutes.route("/record/create-chatroom").post(function (req, res) {
  let db_connect = dbo.getDb();
  let chatroomObj = {
    title: req.body.title,
    course: req.body.course,
    users: req.body.users.split(',').map(user => user.trim()), 
  };

  db_connect.collection("chatrooms")
      .findOne({ email: req.body.title })
      .then(existingChatroom => {
          if (existingChatroom) {
            res.status(201).json({ message: 'Chat with that name already exists.' });
          }
          else {
            db_connect.collection("chatrooms").insertOne(chatroomObj, function (err, result) {
              if (err) {
                console.error(err);
                throw err;
              }
            });

            res.status(200).json({ message: 'Chatroom Created successfully' });
          }
      })
      .catch(error => {
          console.error("Error finding chatrooms:", error);
          res.status(500).json({ error: 'Internal Server Error' });
      });
});
 
recordRoutes.route("/record/get-chatrooms").get(async function (req, res) {
  try {
    const db_connect = dbo.getDb();
    const result = await db_connect.collection("chatrooms").find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recordRoutes.route("/record/add").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myobj = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
  };

  // Assuming db_connect.collection("users") is your collection
  db_connect.collection("users")
      .findOne({ email: req.body.email })
      .then(existingUser => {

          if (existingUser) {
            res.status(201).json({ message: 'Email already in use.' });
          }
          else {
            db_connect.collection("users").insertOne(myobj, function (err, result) {
              if (err) {
                console.error(err);
                throw err;
              }
            });

            res.status(200).json({ message: 'User signed up successfully' });
          }
      })
      .catch(error => {
          console.error("Error finding user:", error);
          res.status(500).json({ error: 'Internal Server Error' });
      });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   response.json(obj);
 });
});
 
module.exports = recordRoutes;