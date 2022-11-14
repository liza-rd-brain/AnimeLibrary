// import * as puppeteer from "puppeteer";

import { AnimeHashTable } from "types";
import { RawDetailAnime } from "../types";
import { takeLinkList } from "./takeLinkList";
import { getAnimeDetail } from "./getAnimeDetail";
import { getDetailLinkList } from "./getDetailLinkList";
import { getStructuredDetailHash } from "./getStructuredDetailHash";
import { Browser, PuppeteerLaunchOptions } from "puppeteer";

//TODO: временная мера, исправить тип
let chrome: any = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}
export const makeScraping = async (
  animeName: string,
  controller: AbortController
): Promise<[AnimeHashTable, Browser]> => {
  let chromeOptions: PuppeteerLaunchOptions = {
    headless: false,
    defaultViewport: null,
    slowMo: 100,
  };

  const browser = await puppeteer.launch(chromeOptions);
  // const browser = await puppeteer.launch(chrome);

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    chromeOptions = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  return new Promise<[AnimeHashTable, Browser]>(async (resolve, reject) => {
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
        const detailItem: Omit<RawDetailAnime, "link"> | null =
          await getAnimeDetail(linkList[i], page);

        if (detailItem) {
          const detailItemWithLink = { ...detailItem, link: linkList[i] };
          detailList.push(detailItemWithLink);
        }
      }

      const structuredDetailList: AnimeHashTable =
        getStructuredDetailHash(detailList);

      resolve([structuredDetailList, browser]);
    } catch (err) {
      reject([err, browser]);
    }
  }).finally(() => browser.close());
};
