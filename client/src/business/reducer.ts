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
import { waitingScrapeHandle } from "./phases/waitingScrapeHandle";

export const ActionName = {
  loadedDB: "loadedDB",
  closeCard: "closeCard",
  cardOpened: "cardOpened",
  switchPage: "switchPage",
  dataReceived: "dataReceived",
  endedAddAnime: "endedAddAnime",
  startedAddAnime: "startedAddAnime",
  dataNotFound: "dataNotFound",
  gotServerErr: "gotServerErr",
  endedDeleteAnime: "endedDeleteAnime",
  startedDeleteAnime: "startedDeleteAnime",
  startedAnimeScraping: "startedAnimeScraping",
} as const;

export type ActionType =
  | { type: typeof ActionName.closeCard }
  | { type: typeof ActionName.switchPage }
  | { type: typeof ActionName.dataNotFound }
  | { type: typeof ActionName.gotServerErr }
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
  const [phaseOuter] = state.phase.type.split(".");

  switch (phaseOuter) {
    case "waitingDB": {
      //ждем загрузки БД
      return waitingDB(state, action);
    }

    case "waitingScraping": {
      return waitingScraping(state, action);
    }

    case "waitingScrapeHandle": {
      return waitingScrapeHandle(state, action);
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
