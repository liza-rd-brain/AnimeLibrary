import { AnimeHashTable, DetailAnime } from "types";

export const convertListToHashTable = (
  animeList: DetailAnime[]
): AnimeHashTable => {
  const filteredHashTable = animeList.reduce(
    (prev: AnimeHashTable, item: DetailAnime) => {
      return { ...prev, [item.link]: item };
    },
    {}
  );

  return filteredHashTable;
};
