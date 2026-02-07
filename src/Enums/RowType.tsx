export const RowTypeValues = {
  NotSet: "Not Set",
  AccomodationName: "Accomodation Name",
  AccomodationCost: "Accomodation Cost",
  Address: "Address",
  ArriveTime: "Arrival Time",
  BookingReference: "Booking Reference",
  DateFrom: "Date From",
  DateTo: "Date To",
  FoodCosts: "Food Costs",
  LeaveTime: "Departure Time",
  Location: "Location",
  Notes: "Notes",
  OtherCosts: "Other Costs",
  SeatInfo: "Seat Info",
  TravelTime: "Travel Time",
  TravelFrom: "Travelling From",
  TravelTo: "Travelling To",
  TravelDate: "Travel Date",
  TravelCost: "Travel Cost",
  TransportType: "Travel Type"
} as const;

export type RowType = typeof RowTypeValues[keyof typeof RowTypeValues];