const url = "https://gogoanime1.be/";
const searchInputSelector = ".search-content  input";
const animeName = "Dorohedoro";

async function takeLinkList(page) {
  await page.goto(url);
  await page.focus(searchInputSelector);
  await page.type(searchInputSelector, animeName);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.screenshot({ path: `./screenshot/${Math.random()}.png` });

  // await page.waitForTimeout(5000);

  const animeContainerSelector = ".flw-item";
  const animeList = await page.$$eval(animeContainerSelector, (listAnime) => {
    // const changeUrl = (url) => {};
    const animeTitleList = listAnime.map((item) => {
      const descriptionSelector = ".film-detail.film-detail-fix";
      const descriptionItem = item.querySelector(descriptionSelector);

      const titleSelector = ".film-name a";
      const titleTextElem = descriptionItem.querySelector(titleSelector);
      const titleText = titleTextElem.innerText;
      const urlItem = titleTextElem.href;
      var arr = ["watch", "-episode"];

      const animePart = "anime";

      var a = new RegExp(arr.join("|"), "i");
      const [url, animeToken] = urlItem.split(a);
      const animeHref = `${url}${animePart}${animeToken}`;
      //разделение по словам

      return { titleText, urlItem: animeHref };
    });

    return animeTitleList;
  });

  // console.log(animeList);
  // await page.close();
  return animeList;

  //   await page.screenshot({ path: screenshotPath });
}

module.exports = takeLinkList;
