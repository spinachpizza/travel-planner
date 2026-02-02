import type { BoxRowData } from "./BoxRow";

export type BoxType = "location" | "travel";

export interface BoxData {
  id: string;              
  type: BoxType;
  rows: BoxRowData[];
}