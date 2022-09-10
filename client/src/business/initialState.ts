import { State } from "../types";

export const initialState: State = {
  phase: "waitingUse.idle",
  data: null,
  doEffect: null,
  openedCard: null,
  currPage: "search",
};
