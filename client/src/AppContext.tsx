import React, { createContext, MutableRefObject } from "react";
import { FilterDataType } from "./types";

//TODO: добавить scraping string
type ContextType = {
  filter: MutableRefObject<FilterDataType>;
};

type EmptyContextType = Record<string, never>;

export const AppContext = createContext<ContextType | EmptyContextType>({});
