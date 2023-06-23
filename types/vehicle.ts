export interface Vehicle {
  id: number;
  name: string;
  driverName: string;
  category: string;
  contactNumber: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}
