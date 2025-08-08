import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from '../services/api';
import { useIsFocused } from '@react-navigation/native';

export default function ListaPagosFijosScreen({ navigation }) {
  const [pagosFijos, setPagosFijos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) fetchPagosFijos();
  }, [isFocused]);

  const fetchPagosFijos = async () => {
    try {
      const response = await axios.get('/pagosFijos');
      setPagosFijos(response.data);
    } catch (error) {
      console.error('Error al obtener pagos fijos:', error);
    }
  };

  const eliminarPago = async (id) => {
    Alert.alert('Confirmar', '¿Eliminar este pago fijo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await axios.delete(`/pagosFijos/${id}`);
            fetchPagosFijos();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pagos Fijos</Text>
      <ScrollView>
        {pagosFijos.length === 0 ? (
          <Text style={styles.noData}>No hay pagos fijos registrados</Text>
        ) : (
          pagosFijos.map((p) => (
            <View key={p.id_pago_fijo} style={styles.card}>
              <Text style={styles.text}>Descripción: {p.descripcion}</Text>
              <Text style={styles.text}>Monto: ${p.monto}</Text>
              <Text style={styles.text}>Inicio: {p.fecha_inicio}</Text>
              <Text style={styles.text}>Activo: {p.activo ? 'Sí' : 'No'}</Text>
              <Text style={styles.text}>Categoría: {p.categoria_id}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditarPagoFijo', { pagoFijo: p })
                  }
                >
                  <Text style={styles.link}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarPago(p.id_pago_fijo)}>
                  <Text style={[styles.link, { color: 'red' }]}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NuevoPagoFijo')}
      >
        <Text style={styles.buttonText}>Agregar pago fijo</Text>
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
