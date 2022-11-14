import { AnimeHashTable, DetailAnime, DetailAnimeList } from "types";
import {
  RawDetailAnime,
  RawHashTable,
  UnStructuredDetailAnime,
} from "../types";

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

const getStructuredObj = (
  rawObj: UnStructuredDetailAnime
): Omit<DetailAnime, "link"> => {
  //проверить наличие  полей scores,genre
  const prevScore = rawObj.scores;
  const [currScore, maxScore] = prevScore!.split("/");
  const newScore = currScore.trim();

  const prevGenre = rawObj.genre;
  const genreList = prevGenre!.split(",").map((item) => item.trim());

  return { ...rawObj, scores: newScore, genre: genreList };
};

export const getStructuredDetailHash = (
  detailList: RawDetailAnime[]
): AnimeHashTable => {
  const detailTextList = detailList.reduce(
    (resultHashItem: AnimeHashTable, item: RawDetailAnime) => {
      if (item && item.link) {
        const { detailTextList, ...restDetail } = item;

        if (detailTextList) {
          const unStructuredAnimeItem: UnStructuredDetailAnime =
            detailTextList.reduce(
              (
                prevDetail: {} | UnStructuredDetailAnime,
                detailItem: string
              ) => {
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
          const newAnimeName = { ...detailObjStructured, ...restDetail };
          return { ...resultHashItem, [item.link]: { ...newAnimeName } };
        } else {
          return { ...resultHashItem, [item.link]: { ...restDetail } };
        }
      } else return resultHashItem;
    },
    {}
  );

  return detailTextList;
};
