import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

import { FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import vehicleData from '../data/vehicles.json';
import { Vehicle } from '../types/vehicle';


const VehicleListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<string>('Все');
  const [isMapView, setIsMapView] = useState<boolean>(false);
  const [region, setRegion] = useState({
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const vehicles: Vehicle[] = vehicleData;


  const filteredVehicles = selectedFilter === 'Все' ? vehicles : vehicles.filter(vehicle => vehicle.category === selectedFilter);
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSwitchToggle = () => {
    setIsMapView((prevState) => !prevState);
  };

  const handleVehiclePress = (vehicle: Vehicle) => {
    navigation.navigate('VehicleScreen', { vehicle });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilterChange('Грузовой')}>
          <Text>Грузовой</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('Пассажирский')}>
          <Text>Пассажирский</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('Спецтранспорт')}>
          <Text>Спецтранспорт</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('Все')}>
          <Text>Все</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16 }}>
        <Text>List View</Text>
        <Switch value={isMapView} onValueChange={handleSwitchToggle} />
        <Text>Map View</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {filteredVehicles ? (
          isMapView ? (

            // <MapView style={{ flex: 1 }} >
            //   {
            //     filteredVehicles.map((vehicle) => (
            //       <Marker
            //         key={vehicle.id}
            //         coordinate={{
            //           latitude: vehicle.location?.latitude || 0,
            //           longitude: vehicle.location?.longitude || 0,
            //         }}
            //         title={vehicle.name}
            //         description={vehicle.driverName}
            //       />
            //     ))}
            // </MapView>) : (
            <MapView style={{ height: "80%", width: "80%", borderRadius: 2, borderColor: "white", borderWidth: 2 }}
              initialRegion={{
                latitude: 55.751244,
                longitude: 37.618423,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }} onRegionChangeComplete={(region) => setRegion(region)} >
              {
                filteredVehicles.map((vehicle) => (
                  <Marker
                    key={vehicle.id}
                    coordinate={{
                      latitude: vehicle.location?.latitude || 0,
                      longitude: vehicle.location?.longitude || 0,
                    }}
                    title={vehicle.name}
                    description={vehicle.driverName}
                  />
                ))}
            </MapView>
          ) : (
            <FlatList
              data={filteredVehicles}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleVehiclePress(item)} style={{ marginBottom: 16 }}>
                  <Text>Название ТС: {item.name}</Text>
                  <Text>Имя водителя: {item.driverName}</Text>
                  <Text>Категория ТС: {item.category}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />)) : (<Text>Нет данных</Text>)
        }
      </View>
    </View >
  );
};


export default VehicleListScreen;

const styles = StyleSheet.create({
  filterContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});