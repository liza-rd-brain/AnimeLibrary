const express = require("express");
const { resolve } = require("path");
const puppeteer = require("puppeteer");
const cors = require("cors");

const { store } = require("./data");
const takeLinkList = require("./business/takeLinkList");
const getDescItem = require("./business/getDescItem");

const app = express();
const port = 3000;

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

// const searchInputSelector = ".search input";
// const url = "https://gogoanime.nl/";

app.use(cors());

app.get("/findName", (req, res) => {
  puppeteer.launch(chromeOptions).then(async function (browser) {
    const page = await browser.newPage();

    try {
      const list = await takeLinkList(page);

      console.log(list);
      //запись в переменную всех items

      for (let i = 0; i < list.length; i++) {
        console.log(list[i].urlItem);
        const itemUrl = await getDescItem(list[i], page);
        console.log(itemUrl);
      }
    } catch (err) {
      console.log(err);
    } finally {
      await browser.close();
    }
  });
  return res.send(store.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
