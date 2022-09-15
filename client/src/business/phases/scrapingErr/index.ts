import { State } from "../../../types";
import { ActionType } from "../../reducer";

export const scrapingErr = (state: State, action: ActionType): State => {
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
};
