import { State } from "../types";

export const initialState: State = {
  // phase: "waitingScraping.waitingScrapeHandle",
  phase: { type: "waitingDB" },
  data: null,
  savedData: null,
  doEffect: { type: "!openDB" },
  openedCard: null,
  currPage: "search",
  dataBase: null,
};
