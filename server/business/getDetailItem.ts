import { DetailAnime } from "../types";

const { format } = require("path");

async function getDetailItem(item, page) {
  const descBlockItems = ".dp-i-content";

  await page.goto(item);
  // await page.screenshot({ path: `./screenshot/${Math.random()}.png` });

  const animeDetailItem: DetailAnime = await page.$eval(
    descBlockItems,
    (item) => {
      const getKey = (name) => {
        const [firstWord, secondWord] = name.split(" ");
        if (!secondWord) {
          return name.toLowerCase();
        } else {
          const secondWordCapitalize = secondWord.replace(
            secondWord[0],
            secondWord[0].toUpperCase()
          );

          return `${firstWord.toLowerCase()}${secondWordCapitalize}`;
        }
      };

      const getStructuredObj = (obj) => {
        //проверить наличие  полей scores,genre
        const prevScore = obj.scores;
        const [currScore, maxScore] = prevScore.split("/");
        const newScore = currScore.trim();

        const prevGenre = obj.genre;
        const genreList = prevGenre.split(",").map((item) => item.trim());

        return { ...obj, scores: newScore, genre: genreList };
      };

      const descriptionSelector = ".description p";
      const pictureSelector = ".film-poster-img";
      const detailSelector = ".elements .row-line";

      const pictureUrl: string = item.querySelector(pictureSelector).src;
      const description: string =
        item.querySelector(descriptionSelector).innerText;

      const enitityNodeList = item.querySelectorAll(detailSelector);
      const entityItemList: Array<HTMLElement> = Array.from(enitityNodeList);

      const detailTextList = entityItemList.map((item) => item.innerText);

      const detailObjRaw = detailTextList.reduce((prevDetail, detailItem) => {
        const [keyName, value] = detailItem.split(":");
        const key = getKey(keyName);

        return { ...prevDetail, [key]: value.trim() };
      }, {});

      const detailObjStructured = getStructuredObj(detailObjRaw);

      const newDetailItem: DetailAnime = {
        pictureUrl,
        description,
        ...detailObjStructured,
      };
      return newDetailItem;
    }
  );

  return animeDetailItem;
}

module.exports = getDetailItem;
