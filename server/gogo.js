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

const animeName = "Elfen Lied";

async function makeScraping(page) {
  await page.goto(url);
  await page.focus(searchInputSelector);
  await page.type(searchInputSelector, animeName);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.screenshot({ path: `./screenshot/${Math.random()}.png` });

  // await page.waitForTimeout(5000);

  const animeContainerSelector = ".flw-item";
  const animeList = await page.$$eval(animeContainerSelector, (listAnime) => {
    // const changeUrl = (url) => {};
    const animeTitleList = listAnime.map((item) => {
      const descriptionSelector = ".film-detail.film-detail-fix";
      const descriptionItem = item.querySelector(descriptionSelector);

      const titleSelector = ".film-name a";
      const titleTextElem = descriptionItem.querySelector(titleSelector);
      const titleText = titleTextElem.innerText;
      const urlItem = titleTextElem.href;
      var arr = ["watch", "-episode"];

      const animePart = "anime";

      var a = new RegExp(arr.join("|"), "i");
      const [url, animeToken] = urlItem.split(a);
      const animeHref = `${url}${animePart}${animeToken}`;
      //разделение по словам

      return { titleText, urlItem: animeHref };
    });

    return animeTitleList;
  });

  // console.log(animeList);
  // await page.close();
  return animeList;

  //   await page.screenshot({ path: screenshotPath });
}

async function getDescItem(item, page) {
  // await newPage.waitForNavigation();
  await page.goto(item.urlItem);
  await page.screenshot({ path: `./screenshot/${Math.random()}.png` });
  return item.urlItem;
}

app.get("/findName", (req, res) => {
  puppeteer.launch(chromeOptions).then(async function (browser) {
    const page = await browser.newPage();

    try {
      const list = await makeScraping(page);

      console.log(list);
      //Достаем первую страницу
      // const descList = await getDescItem(list[0], browser);

      for (let i = 0; i < list.length; i++) {
        console.log(list[i].urlItem);
        const itemUrl = await getDescItem(list[i], page);
        console.log(itemUrl);
      }
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
