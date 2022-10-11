import { State } from "../../../types";
import { ActionType, ActionName } from "../../reducer";

const SERVER_ERR_TEXT = "Something went wrong!";
const ANIME_NOT_FOUND_TEXT = "Anime not found";

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
    case ActionName.dataNotFound: {
      const newState: State = {
        ...state,
        doEffect: null,
        data: ANIME_NOT_FOUND_TEXT,
        phase: { type: "errHandling" },
      };
      return newState;
    }
    case ActionName.gotServerErr: {
      const newState: State = {
        ...state,
        doEffect: null,
        data: SERVER_ERR_TEXT,
        phase: { type: "errHandling" },
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};
