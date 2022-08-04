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

const screenshotPath = "anime.png";

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
      // const titleText = titleElem.innerText;

      const rusNameElem = titleElem.querySelector(".ntitle");
      const romanNameElem = titleElem.querySelector(".romanji");

      const rusNameText = rusNameElem.innerText;
      const romanNameText = romanNameElem.innerText;

      const pictureSelector = "picture source[type='image/jpeg'] ";
      const pictureElem = item.querySelector(pictureSelector);
      const pictureURL = pictureElem.srcset;

      const descElemSelector = ".blkdesc";

      const descriptionBlockElem = item.querySelector(pictureSelector);
      const descCollection = descriptionBlockElem.children;
      const descList = Array.from(descCollection);

      const descObj = descList.reduce((prevDesc, descItem, descItemIndex) => {
        if (descItemIndex > 1) {
          const currKey = getKeyName(descItemIndex);
          const currText = descItem.innerText;
          return { ...prevDesc, [currKey]: currText };
        } else {
          return prevDesc;
        }
      }, {});

      const currObjAnime = {
        ...descObj,
        rusName: rusNameText,
        romanName: romanNameText,
        picture: pictureURL,
      };

      return [...prev, currObjAnime];
    }, []);

    return newList;
  });

  console.log(animeList);

  await page.screenshot({ path: screenshotPath });
}

const getKeyName = (key) => {
  switch (key) {
    case 2: {
      return "season";
    }
    case 3: {
      return "genre";
    }
    case 4: {
      return "country";
    }
    case 5: {
      return "episodeNumbers";
    }
    case 6: {
      return "releaseDate";
    }

    case 7: {
      return "releaseDate";
    }
    case 7: {
      return "director";
    }
    case 8: {
      return "scenario";
    }
    case 9: {
      return "studio";
    }
    case 10: {
      return "rating";
    }

    default: {
      break;
    }
  }
};

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
