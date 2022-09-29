import { State } from "../../../types";
import { ActionType, ActionName } from "../../reducer";

export const dataScraping = (state: State, action: ActionType): State => {
  switch (action.type) {
    case ActionName.dataReceived: {
      const newState: State = {
        ...state,
        doEffect: null,
        data: action.payload,
        phase: { type: "waitingScrapeHandle" },
      };
      return newState;
    }
    case ActionName.dataNotReceived: {
      const newState: State = {
        ...state,
        doEffect: null,
        phase: { type: "scrapingErr" },
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};
