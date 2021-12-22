const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const bodyparser = require("body-parser");
const { scrapper } = require("./searchbot/scrapper.js");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

//////////////////  middleware ////////////////

app.use(expresslayouts);
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

const urlencoded = bodyparser.urlencoded({ extended: false });

const request = (req, res, next) => {
  var urls = [],
    fl = true;
  const re = req.body;
  var status = {
    e1: [],
    e2: [],
    success: [],
    len: 0,
    done: false,
  };
  console.log("i1");
  urls = re.url.split(/[,\s\n]+/);
  len = urls.length;
  console.log(urls);
  try {
    if (fs.existsSync("public/results/emails.csv")) {
      //////file exists
      fs.unlink("public/results/emails.csv", function (err) {
        ///////delete file
        if (err) throw err;
        console.log("File deleted!");
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    for (key in urls) {
      ////////////////puppeteere
      scrapper(urls[key], status, len).then(() => {
        if (status.done && fl) {
          fl = false;
          res.send(status);
          next();
        }
      });
    }
  }
};

///////////////////// endpoints ////////////////////

app.get("/", (req, res) => {
  res.render("main", { title: "Email Extractor", errormessage: "" });
});

app.post("/find", urlencoded, request, (req, res) => {});

/////////////////////////////////////////////

app.listen(port, () => console.log("listening on port " + port));
