// const cors = require("cors");
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";

import * as http from "http";

import { store } from "./data";
import { RawDetailAnime } from "./types";
import { takeLinkList } from "./business/takeLinkList";
import { Request, Response } from "express";
import { getAnimeDetail } from "./business/getAnimeDetail";
import { getStructuredDetailHash } from "./business/getStructuredDetailHash";
import { getDetailLinkList } from "./business/getDetailLinkList";
import { AnimeHashTable } from "types";

const app = express();
const port = 3000;

const ANIME_NAME = "Dorohedoro";

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

app.use(cors());
app.use(bodyParser.json());

const makeScraping = async (): Promise<AnimeHashTable> => {
  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();

  let detailList: Array<RawDetailAnime> = [];

  try {
    const initialList = await takeLinkList(page, ANIME_NAME);
    const listWithDetails = getDetailLinkList(initialList);

    for (let i = 0; i < listWithDetails.length; i++) {
      const detailItem: RawDetailAnime = (await getAnimeDetail(
        listWithDetails[i],
        page
      )) as RawDetailAnime;
      detailList.push(detailItem);
    }

    const structuredDetailList: AnimeHashTable =
      getStructuredDetailHash(detailList);

    store.data = structuredDetailList;
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
    return store.data;
  }
};

app.post("/findName", (req: Request, res) => {
  const animeName = req.body.name;

  const scrapedDate: Promise<AnimeHashTable> = new Promise(
    (resolve, reject) => {
      makeScraping(animeName)
        .then((data) => {
          console.log("makeScraping", data);
          resolve(data);
        })
        .catch((err) => reject(" scrape failed"));
    }
  );

  scrapedDate.then((resolve) => res.send(resolve));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
