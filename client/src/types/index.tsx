import { ERR_TEXT } from "../shared/error";
import { DetailAnime, DetailAnimeList } from "types";

export type State = {
  phase: PhaseType;
  data: AnimeListType | ErrType;
  savedData: AnimeListType | null;
  doEffect: EffectType;
  openedCard: DetailAnime | null;
  currPage: PageName;
  dataBase: IDBDatabase | null;
};

//TODO: уточнить какие строки в типе

export type ErrType = typeof ERR_TEXT[keyof typeof ERR_TEXT];

export type AnimeListType = DetailAnimeList | null;
export type PageName = "search" | "list";

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
  | { type: "errHandling" };

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

export type ResponseType = {
  data: string;
};

export type CardButtonType = "add" | "delete";
