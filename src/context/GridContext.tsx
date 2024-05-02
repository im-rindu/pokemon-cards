import { createContext } from "react";

export interface GridView {
  numGrid: boolean;
}

const GridContext = createContext<GridView | false>(false);

export default GridContext;
