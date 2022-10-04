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
/* __________________________websocket______________ */

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const state = { isAlive: true };

wss.on("pong", () => {
  console.log(state);
  state.isAlive = true;
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    // @ts-ignore
    if (state.isAlive === false) {
      return ws.terminate();
    }
    // @ts-ignore
    state.isAlive = false;
    ws.ping();
  });
}, 3000);

wss.on("connection", (ws: WebSocket) => {
  ws.on;

  ws.on("close", function close() {
    console.log("close inside connection");
    clearInterval(interval);
  });

  ws.on("message", (message: string) => {
    //log the received message and send it back to the client

    const animeName = JSON.parse(message).text;

    const scrapedDate: Promise<DetailAnimeList> = new Promise(
      (resolve, reject) => {
        makeScraping(animeName).then(
          (data) => {
            console.log("makeScraping", data);
            resolve(data);
          },
          (err) => {
            console.log(" scrape failed", err);
            reject("scrape failed");
          }
        );
      }
    );

    scrapedDate
      .then(
        (detailAnimeList) => {
          const detailAnimeJSON = JSON.stringify(detailAnimeList);
          ws.send(detailAnimeJSON);
        },
        (err) => {
          console.log("catching 1");
          // throw err;
        }
      )
      .finally(() => ws.close());
  });

  //send immediatly a feedback to the incoming connection
  // ws.send("Hi there, I am a WebSocket server");
});

//start our server
server.listen(process.env.PORT || 3000, () => {
  const address = server.address() as WebSocket.AddressInfo;
  console.log(`Server started on port ${address.port} :)`);
});

// const port = 3000;

/* __________________________websocket______________ */

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

app.use(cors());
app.use(bodyParser.json());

const makeScraping = async (animeName: string): Promise<DetailAnimeList> => {
  const browser = await puppeteer.launch(chromeOptions);
  console.log("browser", browser);

  try {
    const page = await browser.newPage();

    let detailList: Array<RawDetailAnime> = [];
    const initialList = await takeLinkList(page, animeName);

    console.log("initialList makeScraping ", initialList);

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

    return structuredDetailList;

    // store.data = structuredDetailList;
  } catch (err) {
    console.log("makeScraping err", err);
    throw err;
  } finally {
    await browser.close();
    // return store.data;
  }
};

// app.post("/findName", (req: Request, res) => {
//   const animeName = req.body.name;

//   const scrapedDate: Promise<DetailAnimeList> = new Promise(
//     (resolve, reject) => {
//       makeScraping(animeName)
//         .then((data) => {
//           console.log("makeScraping", data);
//           resolve(data);
//         })
//         .catch((err) => reject(" scrape failed"));
//     }
//   );

//   scrapedDate.then((resolve) => res.send(resolve));
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
