const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

const url = "https://animejoy.ru";

const menuNavSelector = "#menubtn";

const searchFormSelector = "#m_search";
const searchInputSelector = "#story";
// const searchButtonSelector = `${searchInputSelector} + button[type='submit']`;
const searchButtonSelector = ".m_search_btn";
const screenshotPath_1 = "anime_1.png";
const screenshotPath = "anime_2.png";

const animeName = "Созданный в бездне";

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

    await page.waitForTimeout(5000);
    await page.screenshot({ path: screenshotPath });

    // А что отдать, если элемент  не найден, добавить обработку ошибок

    console.log("success type");

    await browser.close();

    //затем ищем строку поиска
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
