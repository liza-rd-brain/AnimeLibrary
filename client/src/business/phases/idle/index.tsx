import { CardOpeningPhase, State } from "../../../types";
import { ActionType } from "../../reducer";

export const idle = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "startedAnimeScraping": {
      const newState: State = {
        ...state,
        phase: { type: "dataScraping" },
        doEffect: { type: "!dataScrape", data: action.payload },
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

    case "switchPage": {
      const newPage = state.currPage === "list" ? "search" : "list";
      const newState: State = {
        ...state,
        currPage: newPage,
      };
      return newState;
    }

    case "startedAddAnime": {
      const newState: State = {
        ...state,
        doEffect: { type: "!startedAddAnime", data: action.payload },
      };

      return newState;
    }
    case "endedAddAnime": {
      if (action.payload) {
        const newState: State = {
          ...state,
          phase: { type: "idle" },
          doEffect: null,
          savedData: action.payload,
        };
        return newState;
      } else {
        const newState: State = {
          ...state,
          phase: { type: "idle" },
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
