import { State } from "../../../types";
import { ActionType, ActionName } from "../../reducer";

export const cardOpening = (state: State, action: ActionType): State => {
  switch (action.type) {
    case ActionName.cardClosed: {
      const newState: State = {
        ...state,
        openedCard: null,
        phase: { type: "idle" },
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

    case ActionName.startedAddAnime: {
      const newState: State = {
        ...state,
        doEffect: { type: "!startedAddAnime", data: action.payload },
      };

      return newState;
    }

    case ActionName.endedAddAnime: {
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
