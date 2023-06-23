import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Отслеживание ТС</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    marginVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
export default Header;