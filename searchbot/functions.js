const fs = require("fs");

function extractEmails(text, url, status) {
  reg =
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")(@|(\(at\))|(\[at\]))(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

  const data = text.match(reg);
  if (data) {  
    console.log(data)                                       //////////////email found
    status.success.push(url);
    status.len=status.len+1;
    data.forEach((data) => {
      const reg = /(@)|(@)|(\(at\))|(\[at\])/;
      data = data.replace(reg, "@");
      fs.appendFile("public/results/emails.csv", `${data}\n`, (error) => {
        if (error) throw error;
      }); 
    });
  } 
  
  else {
    status.e2.push(url);
    status.len=status.len+1;
  }
}

function err(url, status) {                            ///////////invalid
  status.e1.push(url); 
  status.len=status.len+1;
}

module.exports = { extractEmails, err };
