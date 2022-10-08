import { ActionType, ActionName } from "../../reducer";
import { CardOpeningPhase, State } from "../../../types";

export const waitingScrapeHandle = (
  state: State,
  action: ActionType
): State => {
  switch (action.type) {
    case ActionName.startedAnimeScraping: {
      const newState: State = {
        ...state,
        phase: { type: "dataScraping" },
        doEffect: { type: "!dataScrape", data: action.payload },
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

    case ActionName.switchPage: {
      const newPage = state.currPage === "list" ? "search" : "list";
      const newState: State = {
        ...state,
        currPage: newPage,
      };
      return newState;
    }

    case ActionName.startedAddAnime: {
      const newState: State = {
        ...state,
        doEffect: { type: "!startedAddAnime", data: action.payload },
      };

      return newState;
    }

    case ActionName.endedAddAnime: {
      if (action.payload) {
        const newState: State = {
          ...state,
          phase: { type: "waitingScrapeHandle" },
          doEffect: null,
          savedData: action.payload,
        };
        return newState;
      } else {
        const newState: State = {
          ...state,
          phase: { type: "waitingScrapeHandle" },
          doEffect: null,
        };
        return newState;
      }
    }

    default: {
      return state;
    }
  }
};
