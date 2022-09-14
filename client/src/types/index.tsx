export type State = {
  phase: PhaseType;
  data: AnimeListType;
  savedData: AnimeListType | null;
  doEffect: EffectType;
  openedCard: DetailAnime | null;
  currPage: PageName;
  dataBase: IDBDatabase | null;
};

// type DataBase = { database: any };

export type AnimeListType = DetailAnimeList | null;
export type PageName = "search" | "list";

export type ErrorType = "err";

//TODO: dataScraping - рисуем прелоадер и заму

export type PhaseState = {
  curr: PhaseType;
  prev: PhaseType | null;
};

export type PhaseType =
  | { type: "waitingDB" }
  | { type: "waitingScraping.idle" }
  | { type: "waitingScraping.dataScraping" }
  | { type: "idle" }
  | { type: "dataScraping" }
  | { type: "scrapingErr" }
  | { type: "animeAdding" }
  | CardOpeningPhase;

export type SimplePhaseType =
  | { type: "waitingDB" }
  | { type: "waitingScraping.idle" }
  | { type: "waitingScraping.dataScraping" }
  | { type: "idle" }
  | { type: "dataScraping" }
  | { type: "scrapingErr" }
  | { type: "animeAdding" };

type SimplePhaseName = SimplePhaseType["type"];

export type CardOpeningPhase = {
  type: "cardOpening";
  prevType: SimplePhaseName;
};

//data - имя аниме не нужно только для скрейпинга, хранить в сущности эффекта?

export type EffectType =
  | { type: "!openDB" }
  | { type: "!startedAddAnime"; data: DetailAnime }
  | { type: "!dataScrape"; data: string }
  | null;

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
  animeName: string;
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
