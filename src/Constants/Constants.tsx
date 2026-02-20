import { RowTypeValues, type RowType } from "../Enums/RowType";
import { TransportTypeValues, type TransportType } from "../Enums/TransportType";
import type { BoxRowData } from "../Types/BoxRowData";


export const validLocationRowTypes: RowType[] = [
    RowTypeValues.AccomodationName,
    RowTypeValues.AccomodationCost,
    RowTypeValues.Address,
    RowTypeValues.BookingReference,
    RowTypeValues.Dates,
    RowTypeValues.Times,
    RowTypeValues.FoodCosts,
    RowTypeValues.OtherCosts,
    RowTypeValues.Notes
];
    
export const defaultLocationRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.Location, value: "" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.AccomodationCost, cost: "", perPerson: false }
]

export const validTravelRowTypes: RowType[] = [
    RowTypeValues.TravelDate,
    RowTypeValues.Times,
    RowTypeValues.TravelLocations,
    RowTypeValues.SeatInfo,
    RowTypeValues.BookingReference,
    RowTypeValues.TravelCost,
    RowTypeValues.OtherCosts,
    RowTypeValues.Notes
];

export const defaultTravelRowTypes: BoxRowData[] = [
    { id: crypto.randomUUID(), rowType: RowTypeValues.TransportType, value: "Plane" },
    { id: crypto.randomUUID(), rowType: RowTypeValues.TravelCost, cost: "", perPerson: true }
]

export const validTransportTypes : TransportType[] = [
    TransportTypeValues.Boat,
    TransportTypeValues.Bus,
    TransportTypeValues.Car,
    TransportTypeValues.Cycle,
    TransportTypeValues.Plane,
    TransportTypeValues.Train,
    TransportTypeValues.Van,
    TransportTypeValues.Walk,
]



export const textRowTypes : RowType[] = [
    RowTypeValues.AccomodationName,
    RowTypeValues.Activities,
    RowTypeValues.Address,
    RowTypeValues.BookingReference,
    RowTypeValues.LeaveTime,
    RowTypeValues.Location,
    RowTypeValues.Notes,
    RowTypeValues.SeatInfo,
    RowTypeValues.TravelTime,
    RowTypeValues.TransportType
]

export const twoTextRowTypes : RowType[] = [
    RowTypeValues.Times,
    RowTypeValues.TravelLocations
]

export const costRowTypes : RowType[] = [
    RowTypeValues.AccomodationCost,
    RowTypeValues.ActivitiesCost,
    RowTypeValues.FoodCosts,
    RowTypeValues.TravelCost,
    RowTypeValues.OtherCosts
]

export const dateRowTypes : RowType[] = [
    RowTypeValues.Dates,
    RowTypeValues.TravelDate
]
