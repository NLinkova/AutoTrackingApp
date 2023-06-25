export enum VehicleCategory {
  Cargo = "Грузовой",
  Passenger = "Пассажирский",
  Special = "Спецтранспорт",
}

export interface Vehicle {
  id: number;
  name: string;
  driverName: string;
  category: VehicleCategory;
  contactNumber: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}
