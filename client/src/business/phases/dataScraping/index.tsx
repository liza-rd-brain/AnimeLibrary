import { State } from "../../../types";
import { ActionType } from "../../reducer";

export const dataScraping = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "dataReceived": {
      const newState: State = {
        ...state,
        doEffect: null,
        data: action.payload,
        phase: "idle",
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};
