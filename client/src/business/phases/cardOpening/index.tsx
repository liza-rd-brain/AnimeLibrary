import { CardOpeningPhase, State } from "../../../types";
import { ActionType } from "../../reducer";

export const cardOpening = (state: State, action: ActionType): State => {
  const [phaseOuter, phaseInner] = state.phase.type.split(".");
  switch (action.type) {
    case "closeCard": {
      const prevPhase = state.phase as CardOpeningPhase;

      // if (state.phase?.prevType) {
      // }
      const newState: State = {
        ...state,
        openedCard: null,
        phase: { type: prevPhase.prevType },
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
