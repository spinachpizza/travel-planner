import type { BoxRowData } from "../Components/Box/BoxRow";
import { RowTypeValues, type RowType } from "../Enums/RowType";
import { TransportTypeValues, type TransportType } from "../Enums/TransportType";


export const validLocationRowTypes: RowType[] = [
    RowTypeValues.AccomodationName,
    RowTypeValues.AccomodationCost,
    RowTypeValues.Address,
    RowTypeValues.BookingReference,
    RowTypeValues.DateFrom,
    RowTypeValues.DateTo,
    RowTypeValues.FoodCosts,
    RowTypeValues.OtherCosts,
    RowTypeValues.Notes
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
    RowTypeValues.SeatInfo,
    RowTypeValues.BookingReference,
    RowTypeValues.TravelCost,
    RowTypeValues.OtherCosts,
    RowTypeValues.Notes
];

export const defaultTravelRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.TransportType, value: "Plane" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.TravelDate, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.LeaveTime, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.TravelCost, value: "" }
]

export const costRowTypes : RowType[] = [
    RowTypeValues.AccomodationCost,
    RowTypeValues.FoodCosts,
    RowTypeValues.TravelCost,
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