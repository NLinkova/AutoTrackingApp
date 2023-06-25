
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import MapMarker from '../components/MapMarker';
import VehicleCard from '../components/VehicleCard';
import { initialRegion } from '../data/region';
import vehicleData from '../data/vehicles.json';
import { Vehicle, VehicleCategory } from '../types/vehicle';

//компонент экрана со списком транспортных средств
//принимает на вход массив транспортных средств
//при нажатии на карточку транспортного средства открывает экран с подробной информацией о нем

const VehicleListScreen = ({ }) => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<VehicleCategory | 'Все'>('Все');; //фильтр по категории. по умолчанию показываются все ТС
  const [isMapView, setIsMapView] = useState<boolean>(false); //переключатель между списком и картой. по умолчанию показывается список
  const [region, setRegion] = useState({
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }); //регион для карты. по умолчанию - центр Москвы

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    // тут должен быть запрос к API
    try {
      // const response = await fetch('https://api.example.com/vehicles');
      // const data = await response.json();
      // setVehicles(data);

      // в этом приложении используется локальный файл с данными
      setVehicles(vehicleData);
    } catch (error) {
      console.log('Error fetching vehicles:', error);
    }
  };


  const filteredVehicles = selectedFilter === 'Все' ? vehicles : vehicles.filter(vehicle => vehicle.category === selectedFilter);
  const handleFilterChange = (filter: VehicleCategory | 'Все') => {
    setSelectedFilter(filter);
  };

  const handleSwitchToggle = () => {
    setIsMapView((prevState) => !prevState);
  };

  const handleVehiclePress = (vehicle: Vehicle) => {
    navigation.navigate('VehicleScreen', { vehicle });
  };



  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {["Все", ...Object.values(VehicleCategory)].map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => handleFilterChange(category as VehicleCategory)}
            style={selectedFilter === category ? styles.selectedFilterButton : styles.filterButton}
          >
            <Text style={styles.filterText}>{category}</Text>
          </TouchableOpacity>
        ))}
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
              initialRegion={initialRegion} onRegionChangeComplete={(region) => setRegion(region)} >
              {
                filteredVehicles.map((vehicle) => (
                  <MapMarker key={vehicle.id} vehicle={vehicle} onPress={() => handleVehiclePress(vehicle)} />
                ))}
            </MapView>
          ) : (
            <FlatList
              data={filteredVehicles}
              renderItem={({ item }) => (
                <VehicleCard onPress={() => handleVehiclePress(item)} vehicle={item} />
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
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#7ab9e9',
    borderRadius: 8,
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
