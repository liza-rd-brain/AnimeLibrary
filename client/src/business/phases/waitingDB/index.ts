import { State } from "../../../types";
import { ActionType, ActionName } from "../../reducer";

export const waitingDB = (state: State, action: ActionType): State => {
  switch (action.type) {
    case ActionName.loadedDB: {
      const newState: State = {
        ...state,
        phase: { type: "waitingScraping.waitingScrapeHandle" },
        dataBase: action.payload.dataBase,
        doEffect: null,
        savedData: action.payload.animeList,
      };

      return newState;
    }

    /*     case ActionName.switchPage: {
      const newPage = state.currPage === "list" ? "search" : "list";
      const newState: State = {
        ...state,
        currPage: newPage,
      };
      return newState;
    } */
    default: {
      return state;
    }
  }
};
