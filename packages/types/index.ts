export type DetailAnime = {
  link: string;
  status?: string;
  scores?: string;
  studio?: string;
  genre?: string[];
  country?: string;
  episode?: string;
  duration?: string;
  dateAired?: string;
  animeName?: string;
  pictureUrl?: string;
  otherNames?: string;
  description?: string;
  dateRelease?: string;
};

export type DetailAnimeList = Array<DetailAnime>;

export type AnimeHashTable = Record<string, DetailAnime>;
// export type AnimeHashTable = Record<string, Omit<DetailAnime, "animeName">>;
