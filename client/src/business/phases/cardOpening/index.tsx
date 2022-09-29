import { ActionType, ActionName } from "../../reducer";
import { CardOpeningPhase, State } from "../../../types";

export const cardOpening = (state: State, action: ActionType): State => {
  const prevPhase = state.phase as CardOpeningPhase;

  switch (action.type) {
    case ActionName.closeCard: {
      const newState: State = {
        ...state,
        openedCard: null,
        phase: { type: prevPhase.prevType },
      };

      return newState;
    }

    case ActionName.startedDeleteAnime: {
      const newState: State = {
        ...state,
        doEffect: { type: "!startedDeleteAnime", data: action.payload },
      };

      return newState;
    }

    case ActionName.endedDeleteAnime: {
      if (action.payload) {
        const newState: State = {
          ...state,
          phase: { type: prevPhase.prevType },
          doEffect: null,
          savedData: action.payload,
        };
        return newState;
      } else {
        const newState: State = {
          ...state,
          phase: { type: prevPhase.prevType },
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
