import { State } from "../../../types";
import { ActionType, ActionName } from "../../reducer";

export const waitingDB = (state: State, action: ActionType): State => {
  switch (action.type) {
    case ActionName.loadedDB: {
      const newState: State = {
        ...state,
        phase: { type: "idle" },
        dataBase: action.payload.dataBase,
        doEffect: null,
        savedData: action.payload.animeList,
      };

      return newState;
    }

    default: {
      return state;
    }
  }
};
