import {
  AnimeHashTable,
  DetailAnime,
  RawDetailAnime,
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

const getStructuredObj = (rawObj: UnStructuredDetailAnime): DetailAnime => {
  //проверить наличие  полей scores,genre
  const prevScore = rawObj.scores;
  const [currScore, maxScore] = prevScore.split("/");
  const newScore = currScore.trim();

  const prevGenre = rawObj.genre;
  const genreList = prevGenre.split(",").map((item) => item.trim());

  return { ...rawObj, scores: newScore, genre: genreList };
};

// export const getStructuredDetail = (
//   detailList: RawDetailAnime[]
// ): AnimeHashTable => {

//   const detailTextList = detailList.reduce(
//     (resultList: AnimeHashTable, item: RawDetailAnime) => {
//       if (item) {
//         const { detailTextList, animeName, ...restDetail } = item;

//         if (item.detailTextList) {

//           const unStructuredAnimeItem: UnStructuredDetailAnime =
//             item.detailTextList.reduce(
//               (
//                 prevDetail: {} | UnStructuredDetailAnime,
//                 detailItem: string
//               ) => {
//                 const [keyName, value] = detailItem.split(":");
//                 const key = getKey(keyName);

//                 const newDetail = { [key]: value.trim() };

//                 return prevDetail
//                   ? { ...prevDetail, ...newDetail }
//                   : { ...newDetail };
//               },
//               {}
//             );

//           const detailObjStructured = getStructuredObj(unStructuredAnimeItem);

//           const newAnimeItem: AnimeHashTable = {
//             [animeName]: { ...detailObjStructured, ...restDetail },
//           };

//           return {
//             ...resultList,
//             ...newAnimeItem,
//           };
//         } else {
//           const newAnimeItem = { [animeName]: { ...restDetail } };
//           return { ...resultList, ...newAnimeItem };
//         }
//       } else return resultList;
//     },
//     {}
//   );

//   return detailTextList;
// };

export const getStructuredDetail = (
  detailList: RawDetailAnime[]
): DetailAnime[] => {
  const detailTextList = detailList.reduce(
    (resultList: DetailAnime[], item: RawDetailAnime) => {
      if (item) {
        const { detailTextList, ...restDetail } = item;

        if (item.detailTextList) {
          const unStructuredAnimeItem: UnStructuredDetailAnime =
            item.detailTextList.reduce(
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

          return [...resultList, newAnimeName];
        } else {
          return [...resultList, restDetail];
        }
      } else return resultList;
    },
    []
  );

  return detailTextList;
};
