//--главные
//picture
//description

const { format } = require("path");

//Other names
//Status
//Studio
//Scores -  отрежем до разделителя
//Genre - array

//--опциональные (показывать только в карточке?)
// Country: Japan
// Episode: 13 / 13
// Duration: 24 min/ep
// Date release: 2015-10-03
// Date aired: 2015-10-03 - 2015-12-26

async function getDescItem(item, page) {
  const descBlockItems = ".dp-i-content";

  // await newPage.waitForNavigation();
  await page.goto(item.urlItem);
  await page.screenshot({ path: `./screenshot/${Math.random()}.png` });
  // await page.waitForTimeout(10000);

  const animeDescList = await page.$eval(descBlockItems, (item) => {
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
      //проверить наличие  полей scores,
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

    const pictureUrl = item.querySelector(pictureSelector).src;
    const descriptionEl = item.querySelector(descriptionSelector).innerText;

    const enitityNodeList = item.querySelectorAll(detailSelector);
    const entityItemList = Array.from(enitityNodeList);

    const detailTextList = entityItemList.map((item) => item.innerText);

    const detailObjRaw = detailTextList.reduce((prevDetail, detailItem) => {
      const [keyName, value] = detailItem.split(":");
      const key = getKey(keyName);

      return { ...prevDetail, [key]: value.trim() };
    }, {});

    const detailObjStructured = getStructuredObj(detailObjRaw);

    return { pictureUrl, descriptionEl, ...detailObjStructured };
  });

  return animeDescList;
}

module.exports = getDescItem;
