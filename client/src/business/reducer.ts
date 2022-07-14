import { State } from "../types";
import { initialState } from "./initialState";

export type ActionType = {
  type: "appLoading";
};

export const reducer = (
  state: State = initialState,
  action: ActionType
): State => {
  switch (state.phase) {
    default: {
      return state;
    }
  }
};
