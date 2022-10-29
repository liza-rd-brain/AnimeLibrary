import * as puppeteer from "puppeteer";

import { AnimeHashTable, DetailAnimeList } from "types";
import { RawDetailAnime, RawHashTable } from "../types";
import { takeLinkList } from "./takeLinkList";
import { getAnimeDetail } from "./getAnimeDetail";
import { getDetailLinkList } from "./getDetailLinkList";
import { getStructuredDetailHash } from "./getStructuredDetailHash";

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

export const makeScraping = async (
  animeName: string,
  controller: AbortController
): Promise<[AnimeHashTable, puppeteer.Browser]> => {
  const browser = await puppeteer.launch(chromeOptions);

  return new Promise<[AnimeHashTable, puppeteer.Browser]>(
    async (resolve, reject) => {
      try {
        controller.signal.addEventListener("abort", () => {
          console.log("прерывать scraping");
          reject(["err close scraping", browser]);
        });

        const page = await browser.newPage();
        let detailList: Array<RawDetailAnime> = [];
        const initialList = await takeLinkList(page, animeName);

        const linkList: Array<string> = getDetailLinkList(initialList);

        for (let i = 0; i < linkList.length; i++) {
          const detailItem: RawDetailAnime | null = await getAnimeDetail(
            linkList[i],
            page
          );

          if (detailItem) {
            const detailItemWithLink = { ...detailItem, link: linkList[i] };
            detailList.push(detailItemWithLink);
          }
        }

        const structuredDetailList: AnimeHashTable =
          getStructuredDetailHash(detailList);

        /*     console.log("structuredDetailList", structuredDetailList); */

        resolve([structuredDetailList, browser]);
      } catch (err) {
        reject([err, browser]);
      }
    }
  ).finally(() => browser.close());
};
