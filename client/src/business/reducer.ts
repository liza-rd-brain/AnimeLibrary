import { DetailAnime, DetailAnimeList, State } from "../types";
import { initialState } from "./initialState";

import { idle } from "./phases/idle";
import { waitingScraping } from "./phases/waitingScraping";
import { cardOpening } from "./phases/cardOpening";
import { dataScraping } from "./phases/dataScraping";

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

type ActionName = ActionType["type"];

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  const [phaseOuter, phaseInner] = state.phase.type.split(".");

  switch (phaseOuter) {
    case "waitingDB": {
      switch (action.type) {
        case "loadedDB": {
          console.log(action.payload);

          const newState: State = {
            ...state,
            phase: { type: "waitingScraping.idle" },
            dataBase: action.payload.dataBase,
            doEffect: null,
            savedData: action.payload.animeList,
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
      switch (action.type) {
        case "startedAnimeScraping": {
          const newState: State = {
            ...state,
            phase: { type: "dataScraping" },
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

    case "animeAdding": {
      switch (action.type) {
        case "endedAddAnime": {
          if (action.payload) {
            const newState: State = {
              ...state,
              phase: { type: "idle" },
              doEffect: null,
              savedData: action.payload,
            };
            return newState;
          } else {
            const newState: State = {
              ...state,
              phase: { type: "idle" },
              doEffect: null,
            };
            return newState;
          }
        }
        default: {
          return state;
        }
      }
    }

    case "animeDeleting": {
      switch (action.type) {
        case "endedDeleteAnime": {
          const newState: State = {
            ...state,
            phase: { type: "idle" },
            doEffect: null,
            savedData: action.payload,
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
};
