import { DetailAnime } from "types";

export type UnStructuredDetailAnime = Partial<Omit<DetailAnime, "genre">> & {
  genre?: string;
};

export type RawDetailAnime = Pick<
  DetailAnime,
  "pictureUrl" | "description" | "animeName"
> & {
  detailTextList?: Array<string>;
};

// export type DetailObj = Omit<DetailAnime, "pictureUrl" | "description">;
