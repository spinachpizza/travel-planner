export const RowTypeValues = {
	NotSet: "Not Set",
	AccomodationName: "Accomodation Name",
	AccomodationCost: "Accomodation Cost",
	Activities: "Activities",
	ActivitiesCost: "Activities Cost",
	Address: "Address",
	ArriveTime: "Arrival Time",
	BookingReference: "Booking Reference",
	Dates: "Dates",
	FoodCosts: "Food Costs",
	LeaveTime: "Departure Time",
	Location: "Location",
	Notes: "Notes",
	OtherCosts: "Other Costs",
	SeatInfo: "Seat Info",
	Times: "Times",
	TravelLocations: "Locations",
	TravelTime: "Travel Time",
	TravelDate: "Travel Date",
	TravelCost: "Travel Cost",
	TransportType: "Travel Type"
} as const;

export type RowType = typeof RowTypeValues[keyof typeof RowTypeValues];