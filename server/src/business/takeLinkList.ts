import { url } from "../shared/const";

const searchInputSelector = ".search-content  input";
const animeContainerSelector = ".flw-item";

//TODO:уточнить тип
export async function takeLinkList(page, animeName: string) {
  try {
    await page.goto(url);
    await page.focus(searchInputSelector);
    await page.type(searchInputSelector, animeName);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    await page.screenshot({ path: `./screenshot/${Math.random()}.png` });

    const animeList = await page.$$eval(animeContainerSelector, (listAnime) => {
      const animeTitleList = listAnime.map((item) => {
        const descriptionSelector = ".film-detail.film-detail-fix";
        const descriptionItem = item.querySelector(descriptionSelector);

        const titleSelector = ".film-name a";
        const titleTextElem = descriptionItem.querySelector(titleSelector);
        const urlItem = titleTextElem.href;

        return urlItem;
      });

      return animeTitleList;
    });

    return animeList;
  } catch (err) {
    console.log("TakeLinkList", "scraping err");
    return "scraping err";
  }
}
