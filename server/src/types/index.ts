import { DetailAnime } from "types";

export type UnStructuredDetailAnime = Partial<
  Omit<DetailAnime, "genre" | "key">
> & {
  genre?: string;
  /*  link: string; */
};
export type UnStructuredDetailTextList = Omit<UnStructuredDetailAnime, "link">;
export type DetailAnimeWithoutLink = Omit<DetailAnime, "link">;

export type RawDetailAnime = Pick<
  DetailAnime,
  "pictureUrl" | "description" | "animeName" | "link"
> & {
  detailTextList?: Array<string>;
};

export type RawHashTable = Record<string, RawDetailAnime>;

// export type DetailObj = Omit<DetailAnime, "pictureUrl" | "description">;
