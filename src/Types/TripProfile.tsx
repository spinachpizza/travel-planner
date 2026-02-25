import type { BoxData } from "./BoxData";

export type TripProfile = {
    id: string;
    name: string;
    numberOfPeople: number;
    boxes: BoxData[];
};