import { CardOpeningPhase, State } from "../../../types";
import { ActionType } from "../../reducer";

export const cardOpening = (state: State, action: ActionType): State => {
  const [phaseOuter, phaseInner] = state.phase.type.split(".");
  const prevPhase = state.phase as CardOpeningPhase;

  switch (action.type) {
    case "closeCard": {
      const newState: State = {
        ...state,
        openedCard: null,
        phase: { type: prevPhase.prevType },
      };

      return newState;
    }

    case "startedDeleteAnime": {
      const newState: State = {
        ...state,
        doEffect: { type: "!startedDeleteAnime", data: action.payload },
      };

      return newState;
    }

    case "endedDeleteAnime": {
      const newState: State = {
        ...state,
        phase: { type: prevPhase.prevType },
        doEffect: null,
        savedData: action.payload,
      };
      return newState;
    }

    default: {
      return state;
    }
  }
};
