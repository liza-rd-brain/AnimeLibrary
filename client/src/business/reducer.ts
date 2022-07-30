import { State } from "../types";
import { initialState } from "./initialState";

export type ActionType =
  | {
      type: "appLoading";
    }
  | { type: "loadedDB"; payload: IDBDatabase };

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  switch (action.type) {
    case "loadedDB": {
      console.log("action", action);

      const newState: State = {
        ...state,
        dataBase: action.payload,
      };

      return newState;
    }

    default: {
      return state;
    }
  }

  // switch (state.phase) {
  //   // switch(action.type){

  //   //   }

  //   default: {
  //     return state;
  //   }
  // }
};
