import { RowTypeValues, type RowType } from "../Enums/RowType";

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