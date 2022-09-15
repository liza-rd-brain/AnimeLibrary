import { CardOpeningPhase, State } from "../../../types";
import { ActionType } from "../../reducer";
import { dataScraping } from "../dataScraping";

export const waitingScraping = (state: State, action: ActionType): State => {
  const [phaseOuter, phaseInner] = state.phase.type.split(".");

  switch (phaseInner) {
    case "waitingScrapeHandle": {
      switch (action.type) {
        case "startedAnimeScraping": {
          const newState: State = {
            ...state,
            phase: { type: "waitingScraping.dataScraping" },
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

        case "cardOpened": {
          const cardOpeningPhase = {
            type: "cardOpening",
            prevType: state.phase.type,
          } as CardOpeningPhase;

          const newState: State = {
            ...state,
            openedCard: action.payload,
            phase: cardOpeningPhase,
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
