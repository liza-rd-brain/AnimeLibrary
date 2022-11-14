import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import { State } from "../types";
import { initialState } from "./initialState";
import { AnimeHashTable, DetailAnime, DetailAnimeList } from "types";

import { idle } from "./phases/idle";
import { waitingDB } from "./phases/waitingDB";
import { scrapingErr } from "./phases/scrapingErr";
import { cardOpening } from "./phases/cardOpening";
import { dataScraping } from "./phases/dataScraping";

export const ActionName = {
  loadedDB: "loadedDB",
  cardClosed: "cardClosed",
  cardOpened: "cardOpened",
  switchPage: "switchPage",
  dataNotFound: "dataNotFound",
  dataReceived: "dataReceived",
  endedAddAnime: "endedAddAnime",
  toIdleSwitched: "toIdleSwitched",
  startedAddAnime: "startedAddAnime",
  endedDeleteAnime: "endedDeleteAnime",
  filterListByName: "filterListByName",
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
  | { type: typeof ActionName.filterListByName; payload: string }
  | { type: typeof ActionName.startedDeleteAnime; payload: string }
  | { type: typeof ActionName.startedAnimeScraping; payload: string }
  | { type: typeof ActionName.startedAddAnime; payload: DetailAnime }
  | { type: typeof ActionName.endedAddAnime; payload?: AnimeHashTable }
  | { type: typeof ActionName.endedDeleteAnime; payload?: AnimeHashTable }
  | {
      type: typeof ActionName.dataReceived;
      payload: AnimeHashTable;
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
