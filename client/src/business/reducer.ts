import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { initialState } from "./initialState";
import { DetailAnime, DetailAnimeList, State } from "../types";

import { waitingDB } from "./phases/waitingDB";
import { scrapingErr } from "./phases/scrapingErr";
import { cardOpening } from "./phases/cardOpening";
import { dataScraping } from "./phases/dataScraping";
import { waitingScraping } from "./phases/waitingScraping";
import { waitingScrapeHandle } from "./phases/waitingScrapeHandle";

export type ActionType =
  | {
      type: "appLoading";
    }
  | { type: "loadedDB"; payload: { dataBase: IDBDatabase; animeList: any } }
  | { type: "startedAddAnime"; payload: DetailAnime }
  | { type: "endedAddAnime"; payload?: DetailAnimeList }
  | { type: "startedDeleteAnime"; payload: string }
  | { type: "endedDeleteAnime"; payload?: DetailAnimeList }
  | { type: "startedAnimeScraping"; payload: string }
  | {
      type: "dataReceived";
      payload: DetailAnimeList;
    }
  | { type: "dataNotReceived" }
  | {
      type: "cardOpened";
      payload: DetailAnime;
    }
  | {
      type: "closeCard";
    }
  | {
      type: "switchPage";
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

    case "scrapingErr": {
      return scrapingErr(state, action);
    }

    default: {
      return state;
    }
  }
};
