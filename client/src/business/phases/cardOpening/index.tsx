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
    case "startedAddAnime": {
      const newState: State = {
        ...state,
        doEffect: { type: "!startedAddAnime", data: action.payload },
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};
