import { DetailAnime, DetailAnimeList, State } from "../types";
import { initialState } from "./initialState";

export type ActionType =
  | {
      type: "appLoading";
    }
  | { type: "loadedDB"; payload: IDBDatabase }
  | { type: "startedAnimeScraping"; payload: string }
  | {
      type: "dataReceived";
      payload: DetailAnimeList;
    }
  | {
      type: "cardOpened";
      payload: DetailAnime;
    }
  | {
      type: "closeCard";
    }
  | {
      type: "addToList";
      payload: DetailAnime;
    };

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
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

  switch (state.phase) {
    case "idle": {
      switch (action.type) {
        case "startedAnimeScraping": {
          const newState: State = {
            ...state,
            phase: "dataScraping",
            doEffect: { type: "!dataScrape", data: action.payload },
          };
          return newState;
        }
        case "cardOpened": {
          const newState: State = {
            ...state,
            openedCard: action.payload,
            phase: "cardIsOpen",
          };
          return newState;
        }

        default: {
          return state;
        }
      }
    }

    case "dataScraping": {
      switch (action.type) {
        case "dataReceived": {
          const newState: State = {
            ...state,
            doEffect: null,
            data: action.payload,
            phase: "idle",
          };
          return newState;
        }
        default: {
          return state;
        }
      }
    }

    case "cardIsOpen": {
      switch (action.type) {
        case "closeCard": {
          const newState: State = {
            ...state,
            openedCard: null,
            phase: "idle",
          };
          console.log(newState);
          return newState;
        }
        case "addToList": {
          return state;
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
