const express = require("express");
const { resolve } = require("path");
const puppeteer = require("puppeteer");
const cors = require("cors");
const { store } = require("./data");

const app = express();
const port = 3000;

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

const searchInputSelector = ".search-content  input";

// const searchInputSelector = ".search input";
// const url = "https://gogoanime.nl/";

app.use(cors());

const url = "https://gogoanime1.be/";

const animeName = "Naruto";

async function makeScraping(browser) {
  const page = await browser.newPage();

  await page.goto(url);
  await page.focus(searchInputSelector);
  await page.type(searchInputSelector, animeName);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.screenshot({ path: `./screenshot/${Math.random()}.png` });

  // await page.waitForTimeout(5000);

  const animeContainerSelector = ".flw-item";
  const animeList = await page.$$eval(animeContainerSelector, (listAnime) => {
    const animeTitleList = listAnime.map((item) => {
      const descriptionSelector = ".film-detail.film-detail-fix";
      const descriptionItem = item.querySelector(descriptionSelector);

      const titleSelector = ".film-name";
      const titleTextElem = descriptionItem.querySelector(titleSelector);
      const titleText = titleTextElem.innerText;
      return titleText;
    });

    return animeTitleList;
  });

  console.log(animeList);
  return animeList;

  //   await page.screenshot({ path: screenshotPath });
}

app.get("/findName", (req, res) => {
  puppeteer.launch(chromeOptions).then(async function (browser) {
    try {
      await makeScraping(browser);
    } catch (err) {
      console.log(err);
    } finally {
      await browser.close();
    }
  });
  return res.send(store.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
