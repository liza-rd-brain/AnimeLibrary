import { DetailAnime, DetailAnimeList, State } from "../types";
import { initialState } from "./initialState";

import { idle } from "./phases/idle";
import { waitingScraping } from "./phases/waitingScraping";
import { cardOpening } from "./phases/cardOpening";
import { dataScraping } from "./phases/dataScraping";
import { waitingDB } from "./phases/waitingDB";
import { scrapingErr } from "./phases/scrapingErr";

export type ActionType =
  | {
      type: "appLoading";
    }
  | { type: "loadedDB"; payload: { dataBase: IDBDatabase; animeList: any } }
  | { type: "startedAddAnime"; payload: DetailAnime }
  | { type: "endedAddAnime"; payload?: DetailAnimeList }
  | { type: "startedDeleteAnime"; payload: string }
  | { type: "endedDeleteAnime"; payload: DetailAnimeList }
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

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  const [phaseOuter, phaseInner] = state.phase.type.split(".");

  switch (phaseOuter) {
    case "waitingDB": {
      return waitingDB(state, action);
    }

    case "waitingScraping": {
      return waitingScraping(state, action);
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

    case "scrapingErr": {
      return scrapingErr(state, action);
    }

    default: {
      return state;
    }
  }
};
