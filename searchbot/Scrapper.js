const puppeteer = require("puppeteer");
const {extractEmails,err} =require('./functions.js')




const scrapper = (async (url,status) => {
  const browser = await puppeteer.launch({ headless: false}); 
  const page = await browser.newPage(); 
  try{
    await page.goto(url ); 
    const pagetext = await page.$eval("*", (el) => el.innerText);
      extractEmails(pagetext,url,status); ///////// extractEmails from the text
      console.log(status)
    }
  catch(error) {err(url,status)}         ////////// unreachable
  finally{await browser.close(); }   

})

module.exports = {scrapper};


