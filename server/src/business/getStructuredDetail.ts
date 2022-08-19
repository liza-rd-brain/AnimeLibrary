import { DetailAnime, RawDetailAnime, UnStructuredDetailAnime } from "../types";

const getKey = (name: string) => {
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

const getStructuredObj = (rawObj: UnStructuredDetailAnime): DetailAnime => {
  //проверить наличие  полей scores,genre
  const prevScore = rawObj.scores;
  const [currScore, maxScore] = prevScore.split("/");
  const newScore = currScore.trim();

  const prevGenre = rawObj.genre;
  const genreList = prevGenre.split(",").map((item) => item.trim());

  return { ...rawObj, scores: newScore, genre: genreList };
};

export const getStructuredDetail = (detailList: RawDetailAnime[]) => {
  const detailTextList = detailList.map((item) => {
    const unStructuredAnimeItem: UnStructuredDetailAnime =
      item.detailTextList.reduce(
        (prevDetail: {} | UnStructuredDetailAnime, detailItem) => {
          const [keyName, value] = detailItem.split(":");
          const key = getKey(keyName);

          const newDetail = { [key]: value.trim() };

          return prevDetail
            ? { ...prevDetail, ...newDetail }
            : { ...newDetail };
        },
        {}
      );
    const detailObjStructured = getStructuredObj(unStructuredAnimeItem);
    return detailObjStructured;
  });

  return detailTextList;
};
