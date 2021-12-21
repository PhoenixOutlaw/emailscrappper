const puppeteer = require("puppeteer");
const {extractEmails,err} =require('./functions.js')




const scrapper = (async (url,status,len) => {
  const browser = await puppeteer.launch({ headless: true}); 
  const page = await browser.newPage(); 
  try{
    await page.goto(url ); 
    console.log("i2")
    await page.$eval("*", (el) => el.innerText).then((e)=>extractEmails(e,url,status)); ///////// extractEmails from the text
    }
  catch(error) {err(url,status)}         ////////// unreachable
  finally{await browser.close();
    if(status.len===len){
     status.done=true;
    }
   }   

})

// var status={
//   e1:[],
//   e2:[],
//   success:[],
//   len:0,
//   done:true
// }  

// scrapper("https://www.zoho.com/mail/how-to/choose-a-professional-email-address.html",status)

module.exports = {scrapper};


