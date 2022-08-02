const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

const url = "https://animejoy.ru";
const animeName = "Созданный в бездне";

const menuNavSelector = "#menubtn";

const searchFormSelector = "#m_search";
const searchInputSelector = "#story";
// const searchButtonSelector = `${searchInputSelector} + button[type='submit']`;
const searchButtonSelector = ".m_search_btn";
const screenshotPath_1 = "anime_1.png";
const screenshotPath = "anime_2.png";

const articleSelector = "article.shortstory";

app.get("/", (req, res) => {
  puppeteer.launch().then(async function (browser) {
    const page = await browser.newPage();
    //ждем загрузки страницы
    await page.goto(url);

    // await page.screenshot({ path: screenshotPath });

    console.log("before type");
    //1. Открываем панель меню
    await page.screenshot({ path: screenshotPath_1 });
    await page.click(menuNavSelector);
    await page.focus(searchInputSelector);
    await page.type(searchInputSelector, animeName);
    await page.keyboard.press("Enter");
    //Ждем загрузку страницы
    await page.waitForNavigation();
    await page.screenshot({ path: screenshotPath });

    // const digimonNames = await page.$$eval(
    //   "#digiList tbody tr td:nth-child(2) a",
    //   function (digimons) {
    //     // Mapping each Digimon name to an array
    //     return digimons.map(function (digimon) {
    //       return digimon.innerText;
    //     });
    //   }
    // );
    const titleSelector = ".titleup";

    const animeList = await page.$$eval(articleSelector, (list) => {
      const newList = list.reduce((prev, item, index) => {
        console.log(item);
        const titleElem = item.querySelector(".titleup");
        const titleText = titleElem.innerText;

        console.log(titleElem);
        return [...prev, titleText];
      }, []);

      return newList;
    });

    // А что отдать, если элемент  не найден, добавить обработку ошибок !!

    console.log("success type");

    console.log(animeList);
    await browser.close();

    //затем ищем строку поиска
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
