const cors = require("cors");
const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

import * as http from "http";
import * as WebSocket from "ws";

import { store } from "./data";
import { DetailAnimeList, RawDetailAnime } from "./types";
import { takeLinkList } from "./business/takeLinkList";
import { Request, Response } from "express";
import { getAnimeDetail } from "./business/getAnimeDetail";
import { getStructuredDetail } from "./business/getStructuredDetail";
import { getDetailLinkList } from "./business/getDetailLinkList";

const webSocketConnection = { connect: false };

const app = express();
const PORT = 3000;
/* __________________________websocket______________ */

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const state = { isAlive: true };

wss.on("connection", (ws: WebSocket) => {
  const controller = new AbortController();

  ws.on("close", function close() {
    controller.abort();
    console.log("close inside connection");
  });

  ws.on("message", (message: string) => {
    const animeName = JSON.parse(message).text;

    makeScraping(animeName, controller)
      .then(
        (detailAnimeList) => {
          const detailAnimeJSON = JSON.stringify(detailAnimeList);
          ws.send(detailAnimeJSON);
        },
        (err) => {
          console.log(" scrape failed", err);
        }
      )
      .finally(() => ws.close());
  });
});

server.listen(process.env.PORT || PORT, () => {
  const address = server.address() as WebSocket.AddressInfo;
  console.log(`Server started on port ${address.port} :)`);
});

/* __________________________websocket______________ */

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

app.use(cors());
app.use(bodyParser.json());

const makeScraping = async (
  animeName: string,
  controller: AbortController
): Promise<DetailAnimeList> => {
  const browser = await puppeteer.launch(chromeOptions);
  console.log("browser", browser);

  return new Promise<DetailAnimeList>(async (resolve, reject) => {
    try {
      controller.signal.addEventListener("abort", () => {
        console.log("прерывать scraping");
        reject("err close scraping");
      });

      const page = await browser.newPage();

      let detailList: Array<RawDetailAnime> = [];
      const initialList = await takeLinkList(page, animeName);

      const listWithDetails = getDetailLinkList(initialList);

      for (let i = 0; i < listWithDetails.length; i++) {
        const detailItem: RawDetailAnime = await getAnimeDetail(
          listWithDetails[i],
          page
        );
        detailList.push(detailItem);
      }

      const structuredDetailList: DetailAnimeList =
        getStructuredDetail(detailList);

      resolve(structuredDetailList);
    } catch {
      reject();
    }
  })
    .catch((err) => {
      console.log("makeScraping err", err);
      throw err;
    })
    .finally(() => {
      return browser.close();
    });
};
