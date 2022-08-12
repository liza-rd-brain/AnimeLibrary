const express = require("express");
const { resolve } = require("path");
const puppeteer = require("puppeteer");
const cors = require("cors");

const { store } = require("./data");

const app = express();
const port = 3000;

app.use(cors());

const url = "https://animejoy.ru";
const animeName = "Созданный в бездне";

const menuNavSelector = "#menubtn";

const searchFormSelector = "#m_search";
const searchInputSelector = "#story";
const searchButtonSelector = ".m_search_btn";

const screenshotPath = "anime.png";

const articleSelector = "article.shortstory";

const chromeOptions = {
  headless: false,
  defaultViewport: null,
  slowMo: 100,
};

async function makeScraping(browser) {
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"
  );

  await page.goto(url);
  await page.click(menuNavSelector);

  await page.focus(searchInputSelector);
  await page.type(searchInputSelector, animeName);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  // await page.screenshot({ path: `${Math.random()}.png` });

  const animeList = await page.$$eval(articleSelector, (list) => {
    const getKey = (name) => {
      switch (name) {
        case "Сезон": {
          return "season";
        }
        case "Жанр": {
          return "genre";
        }
        case "Страна": {
          return "country";
        }
        case "Количество серий": {
          return "episodeNumbers";
        }
        case "Дата выпуска": {
          return "releaseDate";
        }

        case "Режиссер": {
          return "director";
        }
        case "Сценарий": {
          return "scenario";
        }
        case "Студия": {
          return "studio";
        }
        case "Рейтинг": {
          return "rating";
        }

        default: {
          break;
        }
      }
    };

    const newList = list.reduce((prev, item, index) => {
      const titleElem = item.querySelector(".titleup");

      const rusNameElem = titleElem.querySelector(".ntitle");
      const romanNameElem = titleElem.querySelector(".romanji");

      const rusNameText = rusNameElem.innerText;
      const romanNameText = romanNameElem.innerText;

      const pictureSelector = "picture source[type='image/jpeg'] ";
      const pictureElem = item.querySelector(pictureSelector);
      const pictureURL = pictureElem.srcset;

      const detailElemSelector = ".blkdesc";
      const descriptionElemSelector = ".pcdescr";

      const detailBlockElem = item.querySelector(detailElemSelector);
      const [descName, descText] = item
        .querySelector(descriptionElemSelector)
        .innerText.split(":");

      const detailCollection = detailBlockElem.children;

      const detailList = Array.from(detailCollection);

      // TODO:genre - вынести в массив
      const detailObj = detailList.reduce((prevDetail, detailItem) => {
        const currText = detailItem.innerText;

        const [keyName, value] = currText.split(":");
        const key = getKey(keyName);

        if (key) {
          return { ...prevDetail, [key]: value };
        } else {
          return prevDetail;
        }
      }, {});

      const currObjAnime = {
        ...detailObj,
        description: descText,
        rusName: rusNameText,
        romanName: romanNameText,
        picture: pictureURL,
      };

      return [...prev, currObjAnime];
    }, []);

    return newList;
  });

  store.data = animeList;

  console.log(animeList);

  await page.screenshot({ path: screenshotPath });
}

app.get("/", (req, res) => {
  // puppeteer.launch().then(async function (browser) {
  //   try {
  //     await makeScraping(browser);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     await browser.close();
  //   }
  // });
  // return res.send(store.data);
});

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
