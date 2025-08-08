import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ResumenGraficaScreen from './screens/ResumenGraficaScreen';
import ListaTransaccionesScreen from './screens/ListaTransaccionesScreen';
import TransaccionFormScreen from './screens/TransaccionFormScreen';
import EditarTransaccionScreen from './screens/EditarTransaccionScreen';
import ListaPresupuestosScreen from './screens/ListaPresupuestosScreen';
import PresupuestoFormScreen from './screens/PresupuestoFormScreen';
import ListaPagosFijosScreen from './screens/ListaPagosFijosScreen';
import PagoFijoFormScreen from './screens/PagoFijoFormScreen';
import ListaPagosScreen from './screens/ListaPagosScreen';
import PagoFormScreen from './screens/PagoFormScreen';
import NotificacionesScreen from './screens/NotificacionesScreen';

const Stack = createStackNavigator();

// 🌐 Navegación protegida según autenticación
const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {!token ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ResumenGrafica" component={ResumenGraficaScreen} />
          <Stack.Screen name="Transacciones" component={ListaTransaccionesScreen} />
          <Stack.Screen name="NuevaTransaccion" component={TransaccionFormScreen} />
          <Stack.Screen name="EditarTransaccion" component={EditarTransaccionScreen} />
          <Stack.Screen name="Presupuestos" component={ListaPresupuestosScreen} />
          <Stack.Screen name="NuevoPresupuesto" component={PresupuestoFormScreen} />
          <Stack.Screen name="EditarPresupuesto" component={PresupuestoFormScreen} />
          <Stack.Screen name="PagosFijos" component={ListaPagosFijosScreen} />
          <Stack.Screen name="NuevoPagoFijo" component={PagoFijoFormScreen} />
          <Stack.Screen name="EditarPagoFijo" component={PagoFijoFormScreen} />
          <Stack.Screen name="Pagos" component={ListaPagosScreen} />
          <Stack.Screen name="NuevoPago" component={PagoFormScreen} />
          <Stack.Screen name="EditarPago" component={PagoFormScreen} />
          <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
