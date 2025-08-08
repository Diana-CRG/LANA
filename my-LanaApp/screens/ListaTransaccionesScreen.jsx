import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import axios from '../services/api';
import { useIsFocused } from '@react-navigation/native';

export default function ListaTransaccionesScreen({ navigation }) {
  const [transacciones, setTransacciones] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) fetchTransacciones();
  }, [isFocused]);

  const fetchTransacciones = async () => {
    try {
      const response = await axios.get('/transacciones');
      setTransacciones(response.data);
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
    }
  };

  const eliminarTransaccion = async (id) => {
    Alert.alert('Confirmar', '¿Eliminar esta transacción?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await axios.delete(`/transacciones/${id}`);
            fetchTransacciones();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis Transacciones</Text>
      <ScrollView>
        {transacciones.length === 0 ? (
          <Text style={styles.noData}>No hay transacciones registradas</Text>
        ) : (
          transacciones.map((t) => (
            <View key={t.id_transaccion} style={styles.card}>
              <Text style={styles.tipo}>{t.tipo.toUpperCase()}</Text>
              <Text style={styles.descripcion}>{t.descripcion}</Text>
              <Text style={styles.monto}>${t.monto}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditarTransaccion', { id: t.id_transaccion })
                  }
                >
                  <Text style={styles.link}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarTransaccion(t.id_transaccion)}>
                  <Text style={[styles.link, { color: 'red' }]}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NuevaTransaccion')}
      >
        <Text style={styles.buttonText}>Agregar nueva</Text>
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
  tipo: { color: '#C38C6B', fontWeight: 'bold' },
  descripcion: { fontSize: 16, color: '#4A3F3F' },
  monto: { fontSize: 18, fontWeight: 'bold', color: '#4A3F3F' },
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
