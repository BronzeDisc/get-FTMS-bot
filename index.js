require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5005;

const puppeteer = require("puppeteer");

const my_address = process.env.PUBLIC_ADDRESS || "YOUR PUBLIC KEY HERE";

// run the bot first then run it each 10 minutes
const run = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 1700 });
  await page.goto("https://faucet.fantom.network/");

  await page.waitForTimeout(3000);
  await page.type("input", my_address);
  await page.waitForTimeout(1000);
  await page.click('button[class="App-request-btn"]');
  await page.waitForTimeout(5000);
  // await page.waitForNavigation();
  // await page.waitForTimeout(1000 * 600);

  await browser.close();
};

run();

setInterval(async () => {
  (async () => {
    run();
  })();
}, 1100 * 60 * 13);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

// https://kovan.chain.link/
// https://ropsten.chain.link/
// https://faucets.chain.link/
// https://faucet.polygon.technology/
// // document.querySelector('li[class="Box-sc-1vpmd2a-0 cDTLBZ"]').parentNode.children
