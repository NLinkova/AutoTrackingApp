import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import VehicleListScreen from './screens/VehicleListScreen';
import VehicleScreen from './screens/VehicleScreen';
import { Vehicle } from './types/vehicle';

const Stack = createNativeStackNavigator();
export type StackParams = {
  VehicleListScreen: undefined;
  VehicleScreen: { vehicle: Vehicle };
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='VehicleListScreen' screenOptions={{
        headerStyle: {
          backgroundColor: '#1e45f4',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="VehicleListScreen" component={VehicleListScreen} options={{ title: "Все ТС" }} />
        <Stack.Screen name="VehicleScreen" component={VehicleScreen} options={{ title: "Транспортое Средство" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});