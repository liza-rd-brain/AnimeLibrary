import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import { State, SimplePhaseName } from "../types";
import { initialState } from "./initialState";
import { DetailAnime, DetailAnimeList } from "types";

import { waitingDB } from "./phases/waitingDB";
import { scrapingErr } from "./phases/scrapingErr";
import { cardOpening } from "./phases/cardOpening";
import { dataScraping } from "./phases/dataScraping";
import { waitingScraping } from "./phases/waitingScraping";
import { idle } from "./phases/idle";

export const ActionName = {
  loadedDB: "loadedDB",
  cardClosed: "cardClosed",
  cardOpened: "cardOpened",
  switchPage: "switchPage",
  filterList: "filterList",
  dataNotFound: "dataNotFound",
  dataReceived: "dataReceived",
  endedAddAnime: "endedAddAnime",
  toIdleSwitched: "toIdleSwitched",
  startedAddAnime: "startedAddAnime",
  endedDeleteAnime: "endedDeleteAnime",
  startedDeleteAnime: "startedDeleteAnime",
  scrapingInterrupted: "scrapingInterrupted",
  scrappingAborted: "scrappingAborted",
  startedAnimeScraping: "startedAnimeScraping",
} as const;

export type ActionType =
  | { type: typeof ActionName.cardClosed }
  | { type: typeof ActionName.switchPage }
  | { type: typeof ActionName.dataNotFound }
  | { type: typeof ActionName.toIdleSwitched }
  | { type: typeof ActionName.scrappingAborted }
  | { type: typeof ActionName.scrapingInterrupted }
  | { type: typeof ActionName.filterList; payload: string }
  | { type: typeof ActionName.startedDeleteAnime; payload: string }
  | { type: typeof ActionName.startedAnimeScraping; payload: string }
  | { type: typeof ActionName.startedAddAnime; payload: DetailAnime }
  | { type: typeof ActionName.endedAddAnime; payload?: DetailAnimeList }
  | { type: typeof ActionName.endedDeleteAnime; payload?: DetailAnimeList }
  | {
      type: typeof ActionName.dataReceived;
      payload: DetailAnimeList;
    }
  | {
      type: typeof ActionName.cardOpened;
      payload: DetailAnime;
    }
  | {
      type: typeof ActionName.loadedDB;
      payload: { dataBase: IDBDatabase; animeList: any };
    };

export const useAppDispatch = () => {
  const appDispatch = useDispatch<Dispatch<ActionType>>();
  return appDispatch;
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  const phase = state.phase.type;

  switch (phase) {
    case "waitingDB": {
      //ждем загрузки БД
      return waitingDB(state, action);
    }

    case "idle": {
      return idle(state, action);
    }

    case "dataScraping": {
      return dataScraping(state, action);
    }

    case "cardOpening": {
      return cardOpening(state, action);
    }

    case "errHandling": {
      return scrapingErr(state, action);
    }

    default: {
      return state;
    }
  }
};
