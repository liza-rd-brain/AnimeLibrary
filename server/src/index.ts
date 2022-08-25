const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

import { store } from "./data";
import { AnimeHashTable, DetailAnime, RawDetailAnime } from "./types";
import { takeLinkList } from "./business/takeLinkList";
import { Request, Response } from "express";
import { getAnimeDetail } from "./business/getAnimeDetail";
import { getStructuredDetail } from "./business/getStructuredDetail";
import { getDetailLinkList } from "./business/getDetailLinkList";

const app = express();
const port = 3000;

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

app.use(cors());
app.use(bodyParser.json());

const makeScraping = async (animeName: string) => {
  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();

  let detailList: Array<RawDetailAnime> = [];

  try {
    const initialList = await takeLinkList(page, animeName);
    const listWithDetails = getDetailLinkList(initialList);

    for (let i = 0; i < listWithDetails.length; i++) {
      const detailItem: RawDetailAnime = await getAnimeDetail(
        listWithDetails[i],
        page
      );
      detailList.push(detailItem);
    }

    const structuredDetailList: DetailAnime[] = getStructuredDetail(detailList);

    store.data = structuredDetailList;
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
    return store.data;
  }
};

// app.get("/findName", (req, res) => {
//   console.log("req", req);
//   const scrapedDate = new Promise((resolve, reject) => {
//     makeScraping()
//       .then((data) => resolve(data))
//       .catch((err) => reject(" scrape failed"));
//   });

//   scrapedDate.then((resolve) => res.send(resolve));
// });

app.post("/findName", (req: Request, res) => {
  const animeName = req.body.name;

  // console.log("req", req.params.name);
  const scrapedDate = new Promise((resolve, reject) => {
    makeScraping(animeName)
      .then((data) => resolve(data))
      .catch((err) => reject(" scrape failed"));
  });

  scrapedDate.then((resolve) => res.send(resolve));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
