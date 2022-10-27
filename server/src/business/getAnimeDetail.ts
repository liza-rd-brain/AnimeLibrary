import * as puppeteer from "puppeteer";
import { RawDetailAnime } from "../types";

export async function getAnimeDetail(item: string, page: puppeteer.Page) {
  const descBlockItems = ".dp-i-content";

  await page.goto(item);
  // await page.screenshot({ path: `./screenshot/${Math.random()}.png` });

  try {
    const animeDetailItem: RawDetailAnime = await page.$eval(
      descBlockItems,
      (item: Element) => {
        const descriptionSelector = ".description p";
        const pictureSelector = ".film-poster-img";
        const detailSelector = ".elements .row-line";
        const animeNameSelector = ".heading-name";

        const pictureElem: HTMLImageElement | null =
          item.querySelector(pictureSelector);
        const pictureUrl = pictureElem ? pictureElem.src : undefined;

        const animeNameElem: HTMLElement | null =
          item.querySelector(animeNameSelector);
        const animeName = animeNameElem ? animeNameElem.innerText : undefined;

        const descriptionElem: HTMLElement | null =
          item.querySelector(descriptionSelector);
        const description = descriptionElem
          ? descriptionElem.innerText
          : undefined;

        const enitityNodeList: NodeListOf<HTMLElement> =
          item.querySelectorAll(detailSelector);
        const entityItemList: Array<HTMLElement> = Array.from(enitityNodeList);

        const detailTextList = entityItemList.map((item) => item.innerText);

        const newDetailItem: RawDetailAnime = {
          animeName,
          pictureUrl,
          description,
          detailTextList,
        };

        return newDetailItem;
      }
    );

    return animeDetailItem;
  } catch (err) {
    return null;
  }
}
