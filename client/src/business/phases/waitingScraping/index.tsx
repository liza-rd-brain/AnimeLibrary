import { dataScraping } from "../dataScraping";
import { ActionType, ActionName } from "../../reducer";
import { CardOpeningPhase, State } from "../../../types";

export const waitingScraping = (state: State, action: ActionType): State => {
  const [, phaseInner] = state.phase.type.split(".");

  switch (phaseInner) {
    case "waitingScrapeHandle": {
      switch (action.type) {
        case ActionName.startedAnimeScraping: {
          const newState: State = {
            ...state,
            phase: { type: "waitingScraping.dataScraping" },
            doEffect: { type: "!dataScrape", data: action.payload },
          };
          return newState;
        }

        case ActionName.switchPage: {
          const newPage = state.currPage === "list" ? "search" : "list";
          const newState: State = {
            ...state,
            currPage: newPage,
          };
          return newState;
        }

        case ActionName.cardOpened: {
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
