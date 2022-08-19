import { url, animeName } from "../shared/const";

const searchInputSelector = ".search-content  input";
const animeContainerSelector = ".flw-item";

export async function takeLinkList(page) {
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

      const titleText = titleTextElem.innerText;
      //TODO: вынести в отдельную функцию преобразование ссылки?
      const urlItem = titleTextElem.href;
      var arr = ["watch", "-episode"];
      const animePart = "anime";

      var a = new RegExp(arr.join("|"), "i");
      const [url, animeToken] = urlItem.split(a);
      const animeHref = `${url}${animePart}${animeToken}`;
      return animeHref;
    });

    return animeTitleList;
  });

  return animeList;
}
