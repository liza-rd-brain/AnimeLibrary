import { createContext } from "react";

//TODO: добавить scraping string
type ContextType = {};

type EmptyContextType = Record<string, never>;

export const AppContext = createContext<ContextType | EmptyContextType>({});
