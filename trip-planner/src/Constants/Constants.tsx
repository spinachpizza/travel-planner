import type { BoxRowData } from "../Components/BoxRow";
import { RowTypeValues, type RowType } from "../Enums/RowType";
import { TransportTypeValues, type TransportType } from "../Enums/TransportType";


export const validLocationRowTypes: RowType[] = [
    RowTypeValues.AccomodationName,
    RowTypeValues.AccomodationCost,
    RowTypeValues.DateFrom,
    RowTypeValues.DateTo,
    RowTypeValues.FoodCosts,
    RowTypeValues.OtherCosts,
];

export const defaultLocationRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.Location, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.AccomodationCost, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.DateFrom, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.DateTo, value: "" }
]

export const validTravelRowTypes: RowType[] = [
    RowTypeValues.TravelTime,
    RowTypeValues.TravelDate,
    RowTypeValues.LeaveTime,
    RowTypeValues.ArriveTime,
    RowTypeValues.TravelFrom,
    RowTypeValues.TravelTo,
    RowTypeValues.TravelCost,
    RowTypeValues.OtherCosts,
];

export const defaultTravelRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.TransportType, value: "Plane" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.TravelDate, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.LeaveTime, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.ArriveTime, value: "" }
]

export const costRowTypes : RowType[] = [
    RowTypeValues.AccomodationCost,
    RowTypeValues.FoodCosts,
    RowTypeValues.OtherCosts
]

export const validTransportTypes : TransportType[] = [
    TransportTypeValues.Boat,
    TransportTypeValues.Bus,
    TransportTypeValues.Car,
    TransportTypeValues.Cycle,
    TransportTypeValues.Plane,
    TransportTypeValues.Surf,
    TransportTypeValues.Van,
    TransportTypeValues.Walk,
]