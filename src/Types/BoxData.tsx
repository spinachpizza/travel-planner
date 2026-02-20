import type { BoxRowData } from "./BoxRowData";

export type BoxType = "location" | "travel";

export interface BoxData {
  id: string;              
  type: "location" | "travel";
  rows: BoxRowData[];
}