import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import vehicleData from '../data/vehicles.json';
import { Vehicle } from '../types/vehicle';


const VehicleListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<string>('Все');
  const [isMapView, setIsMapView] = useState<boolean>(false);

  const vehicles: Vehicle[] = vehicleData;


  const filteredVehicles = selectedFilter === 'Все' ? vehicles : vehicles.filter(vehicle => vehicle.category === selectedFilter);
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSwitchToggle = () => {
    setIsMapView((prevState) => !prevState);
  };

  const handleVehiclePress = (vehicle: Vehicle) => {
    console.warn("This is a test warning");

    console.log(vehicle);
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
      <View>
        {filteredVehicles ? (
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
          />) : (<Text>Нет данных</Text>)
        }
      </View>
    </View>
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