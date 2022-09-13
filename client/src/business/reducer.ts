import { DetailAnime, DetailAnimeList, State } from "../types";
import { initialState } from "./initialState";

import { idle } from "./phases/idle";
import { waitingUse } from "./phases/waitingUse";
import { cardOpening } from "./phases/cardOpening";
import { dataScraping } from "./phases/dataScraping";

export type ActionType =
  | {
      type: "appLoading";
    }
  | { type: "loadedDB"; payload: { dataBase: IDBDatabase; animeList: any } }
  //
  | { type: "addAnime"; payload: DetailAnime }
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

type ActionName = ActionType["type"];

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  const [phaseOuter, phaseInner] = state.phase.split(".");

  switch (phaseOuter) {
    case "waitingDB": {
      switch (action.type) {
        case "loadedDB": {
          console.log(action.payload);

          const newState: State = {
            ...state,
            phase: "waitingUse.idle",
            dataBase: action.payload.dataBase,
            doEffect: null,
          };
          console.log("newState", newState);
          return newState;
        }

        case "switchPage": {
          const newPage = state.currPage === "list" ? "search" : "list";
          const newState: State = {
            ...state,
            currPage: newPage,
          };
          return newState;
        }
        default: {
          return state;
        }
      }
    }

    case "waitingUse": {
      return waitingUse(state, action);
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
      switch (action.type) {
        case "startedAnimeScraping": {
          const newState: State = {
            ...state,
            phase: "dataScraping",
            doEffect: { type: "!dataScrape", data: action.payload },
          };
          return newState;
        }
        case "switchPage": {
          const newPage = state.currPage === "list" ? "search" : "list";
          const newState: State = {
            ...state,
            currPage: newPage,
          };
          return newState;
        }
        default: {
          return state;
        }
      }
    }

    default: {
      return state;
    }
  }

  /*   switch (action.type) {
    case "loadedDB": {
      console.log("action", action);

      const newState: State = {
        ...state,
        data: action.payload,
      };

      return newState;
    }

    default: {
      return state;
    }
  } */
};
