import { State } from "../../../types";
import { ActionType } from "../../reducer";

export const cardOpening = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "closeCard": {
      const newState: State = {
        ...state,
        openedCard: null,
        phase: "idle",
      };
      console.log(newState);
      return newState;
    }
    case "addToList": {
      return state;
    }
    default: {
      return state;
    }
  }
};
