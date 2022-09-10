import { State } from "../types";

export const initialState: State = {
  phase: "waiting",
  data: null,
  doEffect: null,
  openedCard: null,
  currPage: "search",
};
