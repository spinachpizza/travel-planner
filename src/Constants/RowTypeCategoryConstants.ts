import { RowTypeValues, type RowType } from "../Enums/RowType";

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
    RowTypeValues.ActivitiesCost,
    RowTypeValues.FoodCosts,
    RowTypeValues.TravelCost,
    RowTypeValues.OtherCosts
]

export const dateRowTypes : RowType[] = [
    RowTypeValues.Dates,
    RowTypeValues.TravelDate
]
