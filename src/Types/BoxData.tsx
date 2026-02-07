import type { BoxRowData } from "../Components/Box/BoxRow";

export type BoxType = "location" | "travel";

export interface BoxData {
  id: string;              
  type: "location" | "travel";
  rows: BoxRowData[];
}