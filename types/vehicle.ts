export type VehicleCategory = "Грузовой" | "Пассажирский" | "Спецтранспорт";
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
