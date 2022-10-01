export type State = {
  phase: PhaseType;
  data: AnimeListType;
  savedData: AnimeListType | null;
  doEffect: EffectType;
  openedCard: DetailAnime | null;
  currPage: PageName;
  dataBase: IDBDatabase | null;
};

export type AnimeListType = DetailAnimeList | null;
export type PageName = "search" | "list";

export type ErrorType = "err";

export type PhaseState = {
  curr: PhaseType;
  prev: PhaseType | null;
};

export type PhaseType = SimplePhaseType | CardOpeningPhase;

export type SimplePhaseType =
  | { type: "waitingDB" }
  | { type: "waitingScraping.waitingScrapeHandle" }
  | { type: "waitingScraping.dataScraping" }
  | { type: "waitingScrapeHandle" }
  | { type: "dataScraping" }
  | { type: "scrapingErr" };

type SimplePhaseName = SimplePhaseType["type"];

export type CardOpeningPhase = {
  type: "cardOpening";
  prevType: SimplePhaseName;
};

export type CardDeletingPhase = {};

export type EffectType =
  | { type: "!openDB" }
  | { type: "!startedAddAnime"; data: DetailAnime }
  | { type: "!startedDeleteAnime"; data: string }
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
  data: string;
};

export type CardButtonType = "add" | "delete";
