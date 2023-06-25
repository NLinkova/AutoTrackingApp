import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackParams } from '../App';


type Props = NativeStackScreenProps<StackParams, 'VehicleScreen'>;

const VehicleScreen = ({ route }: Props) => {
  const { vehicle } = route.params;

  const handleCallDriver = () => {
    Linking.openURL(`tel:${vehicle.contactNumber}`);
  };

  const handleSendMessage = () => {
    const message = encodeURIComponent('Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе');
    Linking.openURL(`whatsapp://send?text=${message}&phone=${vehicle.contactNumber}`);
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
    <View style={styles.listContainer}>
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemText}>Категория ТС: {vehicle.category}</Text>
        <Text style={styles.listItemText}>Имя водителя: {vehicle.driverName}</Text>
        <Text style={styles.listItemText}>Контактный номер водителя: {vehicle.contactNumber}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 20 }}>
        <Pressable style={styles.button} onPress={handleCallDriver}>
          <Text style={styles.buttonText}>Позвонить</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Написать</Text>
        </Pressable>
      </View>
      <MapView style={styles.mapView}
        initialRegion={{
          latitude: 55.751244,
          longitude: 37.618423,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: vehicle.location?.latitude || 0,
            longitude: vehicle.location?.longitude || 0,
          }}
          title={vehicle.name}
          description={vehicle.driverName}
        >
          <MaterialCommunityIcons
            name={getMarkerIcon(vehicle.category)}
            size={24}
            color="black"
          />
        </Marker>
      </MapView>
    </View>

  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  mapView: {
    height: '50%',
    width: '80%',
    borderRadius: 2,
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});