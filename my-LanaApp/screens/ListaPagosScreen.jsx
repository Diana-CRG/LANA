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

export default function ListaPagosScreen({ navigation }) {
  const [pagos, setPagos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) fetchPagos();
  }, [isFocused]);

  const fetchPagos = async () => {
    try {
      const response = await axios.get('/pagos');
      setPagos(response.data);
    } catch (error) {
      console.error('Error al obtener pagos:', error);
    }
  };

  const eliminarPago = async (id) => {
    Alert.alert('Confirmar', '¿Eliminar este pago?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await axios.delete(`/pagos/${id}`);
            fetchPagos();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pagos Programados</Text>
      <ScrollView>
        {pagos.length === 0 ? (
          <Text style={styles.noData}>No hay pagos registrados</Text>
        ) : (
          pagos.map((p) => (
            <View key={p.id_pago} style={styles.card}>
              <Text style={styles.text}>Descripción: {p.descripcion}</Text>
              <Text style={styles.text}>Monto: ${p.monto}</Text>
              <Text style={styles.text}>Fecha: {p.fecha_pago}</Text>
              <Text style={styles.text}>Método: {p.metodo_pago}</Text>
              <Text style={styles.text}>Categoría: {p.categoria_id_categoria}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditarPago', { pago: p })}
                >
                  <Text style={styles.link}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarPago(p.id_pago)}>
                  <Text style={[styles.link, { color: 'red' }]}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NuevoPago')}
      >
        <Text style={styles.buttonText}>Agregar pago</Text>
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
