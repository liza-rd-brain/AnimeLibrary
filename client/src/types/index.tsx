export type State = {
  phase: PhaseType;
  data: AnimeListType;
  doEffect: EffectType;
  openedCard: DetailAnime | null;
  currPage: PageName;
};

export type AnimeListType = DetailAnimeList | null;
export type PageName = "search" | "list";

export type ErrorType = "err";

//TODO: dataScraping - рисуем прелоадер и заму
export type PhaseType =
  | "idle"
  | "waiting"
  | "dataScraping"
  | "dataScraping.initial"
  | "cardIsOpen";

//data - имя аниме не нужно только для скрейпинга, хранить в сущности эффекта?

export type EffectType = { type: "!dataScrape"; data: string } | null;

//TODO: вынести, общий с сервером

export type DetailAnime = {
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

export type AnimeHashTable = Record<string, Omit<DetailAnime, "animeName">>;

export type ResponseType = {
  data: DetailAnimeList;
};
