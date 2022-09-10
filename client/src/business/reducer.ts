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
    }
  | {
      type: "switchPage";
    };

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  const [phaseOuter, phaseInner] = state.phase.split(".");
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
  switch (phaseOuter) {
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
