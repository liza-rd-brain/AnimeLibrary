const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

const url = "https://animejoy.ru";
const animeName = "Созданный в бездне";

const menuNavSelector = "#menubtn";

const searchFormSelector = "#m_search";
const searchInputSelector = "#story";
const searchButtonSelector = ".m_search_btn";
const screenshotPath_1 = "anime_1.png";
const screenshotPath = "anime_2.png";

const articleSelector = "article.shortstory";

async function makeScraping(browser) {
  const page = await browser.newPage();

  await page.goto(url);
  await page.click(menuNavSelector);

  await page.focus(searchInputSelector);
  await page.type(searchInputSelector, animeName);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  // await page.screenshot({ path: `${Math.random()}.png` });

  // const titleSelector = ".titleup";
  const animeList = await page.$$eval(articleSelector, (list) => {
    const newList = list.reduce((prev, item, index) => {
      //Почему const titleSelector  не определена
      const titleElem = item.querySelector(".titleup");
      const titleText = titleElem.innerText;

      return [...prev, titleText];
    }, []);

    return newList;
  });

  console.log(animeList);

  await page.screenshot({ path: screenshotPath });
}

app.get("/", (req, res) => {
  puppeteer.launch().then(async function (browser) {
    try {
      await makeScraping(browser);
    } catch (err) {
      console.log(err);
    } finally {
      await browser.close();
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
