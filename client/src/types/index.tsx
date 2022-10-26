import { ERR_TEXT } from "../shared/error";
import { DetailAnime, DetailAnimeList } from "types";

//TODO:data - AnimeListType, errType потом вынести в фазу
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
  | { type: "idle" }
  | { type: "dataScraping" }
  | { type: "errHandling" };

export type SimplePhaseName = SimplePhaseType["type"];

export type CardOpeningPhase = {
  type: "cardOpening";
};

export type CardDeletingPhase = {};

export type EffectType =
  | { type: "!openDB" }
  | { type: "!dataScrape"; data: string }
  | { type: "!scrapeInterrupt" }
  | { type: "!startedAddAnime"; data: DetailAnime }
  | { type: "!startedDeleteAnime"; data: string }
  | null;

export type ResponseType = {
  data: string;
};

export type CardButtonType = "add" | "delete";

export type FilterDataType = {
  name: string | null;
};
