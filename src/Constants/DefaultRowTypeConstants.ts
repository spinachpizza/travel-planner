import { RowTypeValues } from "../Enums/RowType"
import type { BoxRowData } from "../Types/BoxRowData"

export const defaultLocationRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.Location, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.AccomodationCost, cost: "", perPerson: false, perNight: false, nights: "0" }
]

export const defaultTravelRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.TransportType, value: "Plane" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.TravelCost, cost: "", perPerson: true }
]