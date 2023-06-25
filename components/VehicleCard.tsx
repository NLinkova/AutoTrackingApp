import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Vehicle } from '../types/vehicle';
//компонент карточки транспортного средства
//принимает на вход объект транспортного средства и функцию, которая вызывается при нажатии на карточку

type VehicleCardProps = {
  vehicle: Vehicle;
  onPress?: () => void;
};

const VehicleCard = ({ vehicle, onPress }: VehicleCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer} >
      <Text style={styles.listItemText}>Категория ТС: {vehicle.category}</Text>
      <Text numberOfLines={1} style={styles.listItemText}>Имя водителя: {vehicle.driverName}</Text>
      <Text style={styles.listItemText}>Контактный номер водителя: {vehicle.contactNumber}</Text>
    </TouchableOpacity >
  );
}

export default VehicleCard;

//стили позволяют растягивать карточку, чтобы вместить текст, но имя водителя огранчивается одной строкой
const styles = StyleSheet.create({
  listItemContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  listItemText: {
    marginVertical: 2,
    fontSize: 16,
    color: '#000000',
  },
});