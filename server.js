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
  var urls = [];
  const re = req.body;
 var status={
   e1:[],
   e2:[],
   success:[],
   len:0
 }  

  urls=re.url.split(/[,\s\n]+/)
  for (key in urls) {
    console.log(urls[key])
   scrapper(urls[key],status); ////////////////puppeteere
  }
  re.urls = urls;
  next();
};

///////////////////// endpoints ////////////////////

app.get("/", (req, res) => {
  res.render("main", { title: "Email Extractor" , errormessage:""});
});

app.post("/find", urlencoded, request, (req, res) => {
  try {
    if (fs.existsSync("public/results/emails.csv")) {           //////file exists
      fs.unlink("public/results/emails.csv", function (err) {    ///////delete file
        if (err) throw err;
        console.log("File deleted!");
      });
    }
  } finally {
    const re = req.body;
    if (re.url) {
      // res.send(re.urls)
      setTimeout(
        () =>
          res.render("result", {
            title: "Results",
            data: re,
          }),
        6000
      );
    } else
      res.render("main", {
        title: "Email Extractor",
      });
  }
});

/////////////////////////////////////////////

app.listen(port, () => console.log("listening on port " + port));
