import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
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

  const getMarkerIcon = (category: string) => {
    switch (category) {
      case 'Грузовой':
        return 'truck';
      case 'Пассажирский':
        return 'bus';
      case 'Спецтранспорт':
        return 'car-sports';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilterChange('Грузовой')}>
          <Text style={styles.filterText}>Грузовой</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('Пассажирский')}>
          <Text style={styles.filterText} >Пассажирский</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('Спецтранспорт')}>
          <Text style={styles.filterText}>Спецтранспорт</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('Все')}>
          <Text style={styles.filterText}>Все</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapSwitcher}>
        <Text>List View</Text>
        <Switch value={isMapView} onValueChange={handleSwitchToggle} />
        <Text>Map View</Text>
      </View>
      <View style={styles.listContainer}>
        {filteredVehicles ? (
          isMapView ? (
            <MapView style={styles.mapView}
              initialRegion={{
                latitude: 55.751244,
                longitude: 37.618423,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
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
                    onPress={() => handleVehiclePress(vehicle)}
                  >
                    <MaterialCommunityIcons
                      name={getMarkerIcon(vehicle.category)}
                      size={24}
                      color="black"
                    />
                  </Marker>
                ))}
            </MapView>
          ) : (
            <FlatList
              data={filteredVehicles}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleVehiclePress(item)} style={styles.listItemContainer}>
                  <Text style={styles.listItemText}>Название ТС: {item.name}</Text>
                  <Text style={styles.listItemText}>Имя водителя: {item.driverName}</Text>
                  <Text style={styles.listItemText}>Категория ТС: {item.category}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )
        ) : (
          <Text>Нет данных</Text>
        )
        }
      </View>
    </View >
  );
};


export default VehicleListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  filterText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  mapSwitcher: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 20,
    gap: 10
  },
  mapView: {
    height: '80%',
    width: '80%',
    borderRadius: 2,
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  listContainer: {
    flex: 1, alignItems: "center", justifyContent: "center",
    paddingHorizontal: 16,
  },
  listItemContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
    color: '#000000',
  },
});
