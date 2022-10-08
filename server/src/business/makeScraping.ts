// const puppeteer = require("puppeteer");
import * as puppeteer from "puppeteer";

import { takeLinkList } from "./takeLinkList";
import { DetailAnimeList, RawDetailAnime } from "../types";
import { getAnimeDetail } from "./getAnimeDetail";
import { getDetailLinkList } from "./getDetailLinkList";
import { getStructuredDetail } from "./getStructuredDetail";

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

export const makeScraping = async (
  animeName: string,
  controller: AbortController
): Promise<[DetailAnimeList, puppeteer.Browser]> => {
  const browser = await puppeteer.launch(chromeOptions);

  return new Promise<[DetailAnimeList, puppeteer.Browser]>(
    async (resolve, reject) => {
      try {
        controller.signal.addEventListener("abort", () => {
          console.log("прерывать scraping");
          reject(["err close scraping", browser]);
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

        resolve([structuredDetailList, browser]);
      } catch (err) {
        reject([err, browser]);
      }
    }
  ).finally(() => browser.close());
};
