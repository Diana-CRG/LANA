import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'react-native-gesture-handler';

import preg_frec from './screens/preg_frec';
import configuracion from './screens/configuracion';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="preg_frec">
        <Stack.Screen name="preg_frec" component={preg_frec} />
        <Stack.Screen name="configuracion" component={configuracion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

