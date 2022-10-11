import * as puppeteer from "puppeteer";

import { Browser } from "puppeteer/lib/cjs/puppeteer/common/Browser";
import { makeScraping } from "./makeScraping";

const TEST_ANIME_NAME = "dorohedoro";
const TEST_TIMEOUT = 3 * 60 * 1000;

const expectedToBeDisconnected = (browser: puppeteer.Browser) => {
  expect(browser.constructor instanceof Browser);
  expect(browser.isConnected()).toBe(false);
};

describe("Make scraping test cases", () => {
  it(
    "Should close browser instance when scraping done",
    async () => {
      try {
        const controller = new AbortController();
        const [, browser] = await makeScraping(TEST_ANIME_NAME, controller);

        expectedToBeDisconnected(browser);
      } catch ([, browser]) {
        expectedToBeDisconnected(browser);
      }
    },
    TEST_TIMEOUT
  );

  it(
    "Should close browser instance when controller aborted (e.g. user closes or reloads browser)",
    async () => {
      try {
        const controller = new AbortController();
        setTimeout(() => {
          controller.abort();
        }, 0);
        const [, browser] = await makeScraping(TEST_ANIME_NAME, controller);

        expectedToBeDisconnected(browser);
      } catch ([, browser]) {
        expectedToBeDisconnected(browser);
      }
    },
    TEST_TIMEOUT
  );
});
