import { convertListToHashTable } from "../../../shared/helpers";
import { State } from "../../../types";
import { ActionType, ActionName } from "../../reducer";

export const waitingDB = (state: State, action: ActionType): State => {
  switch (action.type) {
    case ActionName.loadedDB: {
      const newHashTable = convertListToHashTable(action.payload.animeList);
      const newState: State = {
        ...state,
        phase: { type: "idle" },
        dataBase: action.payload.dataBase,
        doEffect: null,
        savedData: newHashTable,
      };

      return newState;
    }

    default: {
      return state;
    }
  }
};
