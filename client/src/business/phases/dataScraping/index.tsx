import { State } from "../../../types";
import { ActionType, ActionName } from "../../reducer";
import { ERR_TEXT } from "../../../shared/error";

export const dataScraping = (state: State, action: ActionType): State => {
  switch (action.type) {
    case ActionName.dataReceived: {
      const newState: State = {
        ...state,
        doEffect: null,
        data: action.payload,
        phase: { type: "idle" },
      };
      return newState;
    }

    case ActionName.scrapingInterrupted: {
      const newState: State = {
        ...state,
        doEffect: { type: "!scrapeInterrupt" },
      };
      return newState;
    }

    case ActionName.toIdleSwitched: {
      const newState: State = {
        ...state,
        doEffect: null,
        phase: { type: "idle" },
      };
      return newState;
    }

    case ActionName.dataNotFound: {
      const newState: State = {
        ...state,
        doEffect: null,
        data: ERR_TEXT.animeNotFound,
        phase: { type: "errHandling" },
      };
      return newState;
    }

    case ActionName.scrappingAborted: {
      const manualStopScraping = state.doEffect?.type === "!scrapeInterrupt";

      if (manualStopScraping) {
        const newState: State = {
          ...state,
          doEffect: null,
          phase: { type: "idle" },
        };
        return newState;
      } else {
        const newState: State = {
          ...state,
          doEffect: null,
          data: ERR_TEXT.serverErr,
          phase: { type: "errHandling" },
        };
        return newState;
      }
    }
    default: {
      return state;
    }
  }
};
