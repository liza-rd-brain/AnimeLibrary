import * as puppeteer from "puppeteer";

import { DetailAnimeList } from "types";
import { RawDetailAnime } from "../types";
import { takeLinkList } from "./takeLinkList";
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

        const linkList: Array<string> = getDetailLinkList(initialList);

        console.log(linkList, "linkList");

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

        const structuredDetailList: DetailAnimeList =
          getStructuredDetail(detailList);

        console.log(structuredDetailList);

        resolve([structuredDetailList, browser]);
      } catch (err) {
        reject([err, browser]);
      }
    }
  ).finally(() => browser.close());
};
