import { State } from "../../../types";
import { ActionType } from "../../reducer";

export const waitingDB = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "loadedDB": {
      const newState: State = {
        ...state,
        phase: { type: "waitingScraping.idle" },
        dataBase: action.payload.dataBase,
        doEffect: null,
        savedData: action.payload.animeList,
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
};
