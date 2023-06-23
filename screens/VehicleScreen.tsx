import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
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
      <TouchableOpacity onPress={handleCallDriver}>
        <Text>Позвонить</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSendMessage}>
        <Text>Написать</Text>
      </TouchableOpacity>
      <MapView style={{ height: "80%", width: "80%", borderRadius: 2, borderColor: "white", borderWidth: 2 }}
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
