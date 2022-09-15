import { State } from "../../../types";
import { ActionType } from "../../reducer";

export const dataScraping = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "dataReceived": {
      const newState: State = {
        ...state,
        doEffect: null,
        data: action.payload,
        phase: { type: "waitingScrapeHandle" },
      };
      return newState;
    }
    case "dataNotReceived": {
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
