import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from '../services/api';

export default function NotificacionesScreen() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const obtenerNotificaciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/notificar');
      setNotificaciones(response.data.notificaciones_enviadas || []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron obtener las notificaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerNotificaciones();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#B97868" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView>
          {notificaciones.length === 0 ? (
            <Text style={styles.noData}>
              No hay notificaciones por presupuesto insuficiente.
            </Text>
          ) : (
            notificaciones.map((n, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.usuario}>📩 {n.usuario}</Text>
                <Text style={styles.text}>🔔 Pago: {n.pago}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.button} onPress={obtenerNotificaciones}>
        <Text style={styles.buttonText}>Actualizar notificaciones</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDDCD4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#B97868',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#CFBFB9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  usuario: {
    color: '#4A3F3F',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    color: '#4A3F3F',
  },
  noData: {
    textAlign: 'center',
    color: '#A68677',
    fontSize: 16,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#C38C6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
