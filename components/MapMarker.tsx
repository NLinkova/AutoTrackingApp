import React from "react";
import { Marker } from "react-native-maps";
import { Vehicle, VehicleCategory } from '../types/vehicle';

import { MaterialCommunityIcons } from '@expo/vector-icons';
//компонент карточки транспортного средства

type MapMarkerProps = {
  vehicle: Vehicle;
  onPress?: () => void;
};

const MapMarker = ({ vehicle, onPress }: MapMarkerProps) => {

  const getMarkerIcon = (category: VehicleCategory) => {
    switch (category) {
      case VehicleCategory.Cargo:
        return 'truck';
      case VehicleCategory.Passenger:
        return 'bus';
      case VehicleCategory.Special:
        return 'car-sports';
    }
  };

  return (
    <Marker
      key={vehicle.id}
      coordinate={{
        latitude: vehicle.location?.latitude || 0,
        longitude: vehicle.location?.longitude || 0,
      }}
      title={vehicle.name}
      description={vehicle.driverName}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={getMarkerIcon(vehicle.category)}
        size={24}
        color="black"
      />
    </Marker>
  )
}

export default MapMarker;