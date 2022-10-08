const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

import * as http from "http";
import * as WebSocket from "ws";
import { makeScraping } from "./business/makeScraping";

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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
        ([detailAnimeList]) => {
          const detailAnimeJSON = JSON.stringify(detailAnimeList);
          ws.send(detailAnimeJSON);
        },
        ([err]) => {
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

app.use(cors());

app.use(bodyParser.json());
