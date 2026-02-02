export const RowTypeValues = {
  NotSet: "Not Set",
  AccomodationName: "Accomodation Name",
  AccomodationCost: "Accomodation Cost",
  ArriveTime: "Arrival Time",
  DateFrom: "Date From",
  DateTo: "Date To",
  FoodCosts: "Food Costs",
  LeaveTime: "Departure Time",
  Location: "Location",
  OtherCosts: "Other Costs",
  TravelTime: "Travel Time",
  TravelFrom: "Travelling From",
  TravelTo: "Travelling To",
  TravelDate: "Travel Date",
  TravelCost: "Travel Cost",
  TransportType: "Travel Type"
} as const;

export type RowType = typeof RowTypeValues[keyof typeof RowTypeValues];