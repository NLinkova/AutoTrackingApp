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

  return (
    <View>
      <Text>Категория ТС: {vehicle.category}</Text>
      <Text>Имя водителя: {vehicle.driverName}</Text>
      <Text>Контактный номер водителя: {vehicle.contactNumber}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginVertical: 20 }}>
        <Pressable style={styles.button} onPress={handleCallDriver}>
          <Text style={styles.text}>Позвонить</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.text}>Написать</Text>
        </Pressable>
      </View>
      <MapView style={{
        height: "60%",
        width: "80%", borderRadius: 2, borderColor: "white",
        borderWidth: 2
      }}
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
        />

      </MapView>
    </View>

  );
};

export default VehicleScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2196F3',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});