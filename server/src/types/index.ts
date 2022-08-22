export type DetailAnime = {
  status?: string;
  scores?: string;
  studio?: string;
  genre?: string[];
  country?: string;
  episode?: string;
  duration?: string;
  dateAired?: string;
  pictureUrl?: string;
  otherNames?: string;
  description?: string;
  dateRelease?: string;
};

export type UnStructuredDetailAnime = Partial<Omit<DetailAnime, "genre">> & {
  genre?: string;
};

export type RawDetailAnime = Pick<DetailAnime, "pictureUrl" | "description"> & {
  detailTextList?: Array<string>;
};

// export type DetailObj = Omit<DetailAnime, "pictureUrl" | "description">;
