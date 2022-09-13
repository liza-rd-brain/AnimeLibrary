import { State } from "../types";

export const initialState: State = {
  // phase: "waitingUse.idle",
  phase: "waitingDB",
  data: null,
  savedData: null,
  doEffect: { type: "!openDB" },
  openedCard: null,
  currPage: "search",
  dataBase: null,
};
