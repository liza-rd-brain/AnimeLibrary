// import { Page } from "puppeteer";

import { DetailAnime } from "./types";

const express = require("express");
const { resolve } = require("path");
const puppeteer = require("puppeteer");
const cors = require("cors");

const { store } = require("./data");
const getAnimeDetail = require("./business/getAnimeDetail");
const takeLinkList = require("./business/takeLinkList");

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
    // const page: Promise<Page> = await browser.newPage();
    const page = await browser.newPage();
    try {
      const list = await takeLinkList(page);

      console.log(list);
      //запись в переменную всех items
      let detailList: Array<DetailAnime> = [];
      for (let i = 0; i < list.length; i++) {
        const detailItem: DetailAnime = await getAnimeDetail(list[i], page);
        detailList.push(detailItem);
      }
      store.data = detailList;
      console.log(store);
    } catch (err) {
      console.log(err);
    } finally {
      await browser.close();
    }
  });

  res.send(store.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
