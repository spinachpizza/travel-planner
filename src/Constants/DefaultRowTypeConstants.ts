import { RowTypeValues } from "../Enums/RowType"
import type { BoxRowData } from "../Types/BoxRowData"

export const defaultLocationRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.Location, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.AccomodationCost, cost: "", perPerson: false, perNight: false, nights: "0" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.Dates, fromDate: "", toDate: "" }
]

export const defaultTravelRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.TransportType, value: "Plane" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.TravelCost, cost: "", perPerson: true },
    { id: crypto.randomUUID(), rowType: RowTypeValues.TravelDate, toDate: "", fromDate: "" }
]
