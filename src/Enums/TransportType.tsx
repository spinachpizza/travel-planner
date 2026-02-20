export const TransportTypeValues = {
  NotSet: "Not Set",
  Boat: "Boat",
  Bus: "Bus",
  Car: "Car",
  Cycle: "Cycle",
  Plane: "Plane",
  Train: "Train",
  Van: "Van",
  Walk: "Walk",
} as const;

export type TransportType = typeof TransportTypeValues[keyof typeof TransportTypeValues];