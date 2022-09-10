import { State } from "../../../types";
import { ActionType } from "../../reducer";
import { dataScraping } from "../dataScraping";

export const waitingUse = (state: State, action: ActionType): State => {
  const [phaseOuter, phaseInner] = state.phase.split(".");

  switch (phaseInner) {
    case "idle": {
      switch (action.type) {
        case "startedAnimeScraping": {
          const newState: State = {
            ...state,
            phase: "waitingUse.dataScraping",
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

    case "dataScraping": {
      return dataScraping(state, action);
    }
    default: {
      return state;
    }
  }
};
