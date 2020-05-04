"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
let dns = require("dns");
var cors = require("cors");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectToDB();

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number
});
const Url = mongoose.model("Url", urlSchema);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });
let id = 0;
let longurls = [];

app.post("/api/shorturl/new", (req, res) => {
  let input = req.body.url;
  let noH = input.replace(/^https?:\/\//g, "");

  dns.lookup(noH, (err, addresses, family) => {
    if (err) return res.json({ error: "invalid URL" });
    let url = Url.findOne({ original_url: input, short_url: id }, function(
      err,
      result
    ) {
      if (err) {
        res.send(console.log(err));
      } else {
        res.send(console.log(result));
        if (result === null) {
          id++;
          let short_url = id;
          url = new Url({
            original_url: input,
            short_url: +id
          });
          console.log("here it will save to the db");
          url.save();
        }
      }
    });
  });
});

//end of post

app.get("/api/shorturl/:id", (req, res) => {
  let { id } = req.params;
  let { link } = Url.findOne({ short_url: id }, function(err, result) {
    if (err) {
      res.send(console.log(err));
    } else {
      //res.send(console.log(result.original_url));
      res.redirect(result.original_url);
    }
  });
});

app.listen(port, () => {
  console.log("Node.js listening ...");
});
