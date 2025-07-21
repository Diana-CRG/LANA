import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import preg_frec from './screens/preg_frec';
import configuracion from './screens/configuracion';
import RegistroScreen from './screens/RegistroScreen';
import ChatsScreen from './screens/ChatsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatsScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PreguntasFrecuentes" component={preg_frec} />
        <Stack.Screen name="Configuracion" component={configuracion} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


