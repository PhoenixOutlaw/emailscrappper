const { scrapper } = require("./searchbot/scrapper.js");
const fs = require("fs");

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
  
    urls = re.url.split(/[,\s\n]+/);
    len = urls.length;
    console.log(urls);
    try {
      if (fs.existsSync("public/results/emails.csv")) {             //////file exists
        fs.unlink("public/results/emails.csv", function (err) {     ///////delete file
          if (err) throw err;
          console.log("File deleted!");
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      for (key in urls) {                                      ////////////////puppeteere
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

  module.exports ={request};