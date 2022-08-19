import { RawDetailAnime } from "../types";

export async function getAnimeDetail(item, page) {
  const descBlockItems = ".dp-i-content";

  await page.goto(item);
  // await page.screenshot({ path: `./screenshot/${Math.random()}.png` });

  const animeDetailItem: RawDetailAnime = await page.$eval(
    descBlockItems,
    (item) => {
      const descriptionSelector = ".description p";
      const pictureSelector = ".film-poster-img";
      const detailSelector = ".elements .row-line";

      const pictureUrl: string = item.querySelector(pictureSelector).src;

      const description: string =
        item.querySelector(descriptionSelector).innerText;

      const enitityNodeList = item.querySelectorAll(detailSelector);
      const entityItemList: Array<HTMLElement> = Array.from(enitityNodeList);

      const detailTextList = entityItemList.map((item) => item.innerText);

      const newDetailItem: RawDetailAnime = {
        pictureUrl,
        description,
        detailTextList,
      };
      return newDetailItem;
    }
  );

  return animeDetailItem;
}
