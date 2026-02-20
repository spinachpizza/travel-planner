import type { RowType, RowTypeValues } from "../Enums/RowType";

export interface BaseRowData {
    id: string;
    rowType: RowType; 
}

export interface TextRowData extends BaseRowData {
    rowType:
        | typeof RowTypeValues.AccomodationName
        | typeof RowTypeValues.Activities
        | typeof RowTypeValues.Address
        | typeof RowTypeValues.BookingReference
        | typeof RowTypeValues.LeaveTime
        | typeof RowTypeValues.Location
        | typeof RowTypeValues.Notes
        | typeof RowTypeValues.SeatInfo
        | typeof RowTypeValues.TravelTime
        | typeof RowTypeValues.TransportType
    value: string;
}

export interface TwoTextRowData extends BaseRowData {
    rowType:
        | typeof RowTypeValues.Times
        | typeof RowTypeValues.TravelLocations
    value1: string;
    value2: string;
}

export interface CostRowData extends BaseRowData {
    rowType:
        | typeof RowTypeValues.AccomodationCost
        | typeof RowTypeValues.FoodCosts
        | typeof RowTypeValues.OtherCosts
        | typeof RowTypeValues.TravelCost;
    cost: string;
    perPerson: boolean;
}

export interface DateRowData extends BaseRowData {
    rowType:
        | typeof RowTypeValues.Dates
        | typeof RowTypeValues.TravelDate;
    fromDate: string;
    toDate: string;
}

export interface TransportRowData extends BaseRowData {
    rowType:
        | typeof RowTypeValues.TransportType;
    value: string;
}

export type BoxRowData =
    | TextRowData
    | TwoTextRowData
    | CostRowData
    | DateRowData
    | TransportRowData