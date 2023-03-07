import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { RestaurantScreen } from './screens/RestaurantScreen';
import { ThemeProvider } from "styled-components/native";
import { theme } from './infrastructure/theme/index';
import {
  useFonts as UsePoppins,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

import { Provider } from 'react-redux'
import { store } from './store';
import { BasketScreen } from './screens/BasketScreen';
import { PreparingOrderScreen } from './screens/PreparingOrderScreen';
import { DeliveryScreen } from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  const [PoppinsLoaded] = UsePoppins({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  if (!PoppinsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
            <Stack.Screen 
              name="Basket" 
              component={BasketScreen} 
              options={{ animation: 'flip', headerShown:false}}
            />
            <Stack.Screen name="Preparing"
            options={{ animation: 'flip', headerShown:false}}
             component={PreparingOrderScreen} />
             <Stack.Screen name="Delivery"
            options={{ animation: 'flip', headerShown:false}}
             component={DeliveryScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </Provider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

