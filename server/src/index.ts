const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");

import { store } from "./data";
import { animeName } from "./shared/const";
import { DetailAnime, RawDetailAnime } from "./types";
import { takeLinkList } from "./business/takeLinkList";
import { getAnimeDetail } from "./business/getAnimeDetail";
import { getStructuredDetail } from "./business/getStructuredDetail";

const app = express();
const port = 3000;

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

app.use(cors());

const makeScraping = async () => {
  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();

  let detailList: Array<RawDetailAnime> = [];

  try {
    const list = await takeLinkList(page);

    for (let i = 0; i < list.length; i++) {
      const detailItem: RawDetailAnime = await getAnimeDetail(list[i], page);
      detailList.push(detailItem);
    }
    const structuredDetailList: DetailAnime[] = getStructuredDetail(detailList);
    store[animeName] = structuredDetailList;
    console.log(store);
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
    return store;
  }
};

app.get("/findName", (req, res) => {
  const scrapedDate = new Promise((resolve, reject) => {
    makeScraping()
      .then((data) => resolve(data))
      .catch((err) => reject(" scrape failed"));
  });

  scrapedDate.then((resolve) => res.send(resolve));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
