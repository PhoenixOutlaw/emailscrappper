const puppeteer = require("puppeteer");
const { extractEmails, err } = require("./functions.js");

const scrapper = async (url, status, len) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url);
    console.log("done");
    await page
      .$eval("*", (el) => el.innerText)
      .then((e) => extractEmails(e, url, status)); ///////// extractEmails from the text
  } catch (error) {
    err(url, status);
  } finally {
    ////////// unreachable
    await browser.close();
    if (status.len === len) {
      status.done = true;
    }
  }
};

module.exports = { scrapper };
