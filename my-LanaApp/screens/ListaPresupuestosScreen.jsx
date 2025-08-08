import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import axios from '../services/api';
import { useIsFocused } from '@react-navigation/native';

export default function ListaPresupuestosScreen({ navigation }) {
  const [presupuestos, setPresupuestos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) fetchPresupuestos();
  }, [isFocused]);

  const fetchPresupuestos = async () => {
    try {
      const response = await axios.get('/presupuestos');
      setPresupuestos(response.data);
    } catch (error) {
      console.error('Error al obtener presupuestos:', error);
    }
  };

  const eliminarPresupuesto = async (id) => {
    Alert.alert('Confirmar', '¿Eliminar este presupuesto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await axios.delete(`/presupuestos/${id}`);
            fetchPresupuestos();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Presupuestos Actuales</Text>
      <ScrollView>
        {presupuestos.length === 0 ? (
          <Text style={styles.noData}>No hay presupuestos registrados</Text>
        ) : (
          presupuestos.map((p) => (
            <View key={p.id_presupuesto} style={styles.card}>
              <Text style={styles.text}>Categoría: {p.id_categoria}</Text>
              <Text style={styles.text}>Monto: ${p.monto}</Text>
              <Text style={styles.text}>Desde: {p.fecha_crea}</Text>
              <Text style={styles.text}>Hasta: {p.fecha_venc}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditarPresupuesto', { presupuesto: p })
                  }
                >
                  <Text style={styles.link}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarPresupuesto(p.id_presupuesto)}>
                  <Text style={[styles.link, { color: 'red' }]}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NuevoPresupuesto')}
      >
        <Text style={styles.buttonText}>Nuevo presupuesto</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EDDCD4', padding: 20 },
  title: { fontSize: 24, color: '#B97868', fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#CFBFB9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: { color: '#4A3F3F' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  link: { color: '#A68677', fontWeight: 'bold' },
  button: {
    backgroundColor: '#C38C6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  noData: { textAlign: 'center', marginTop: 40, color: '#A68677' },
});
