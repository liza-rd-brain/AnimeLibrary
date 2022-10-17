import { State } from "../types";

export const initialState: State = {
  phase: { type: "waitingDB" },
  data: null,
  savedData: null,
  doEffect: { type: "!openDB" },
  openedCard: null,
  currPage: "search",
  dataBase: null,
};
