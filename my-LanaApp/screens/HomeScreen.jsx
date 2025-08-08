import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const [resumen, setResumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, userName } = useContext(AuthContext);

  useEffect(() => {
    fetchResumen();
  }, []);

  const fetchResumen = async () => {
    try {
      const response = await axios.get('/resumen/categorias');
      setResumen(response.data);
    } catch (error) {
      console.error('Error al cargar resumen:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hola {userName || 'Usuario'} 👋</Text>
      <Text style={styles.subtitle}>Resumen de tus finanzas por categoría</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#B97868" />
      ) : (
        <ScrollView style={styles.cardContainer}>
          {resumen.length === 0 ? (
            <Text style={styles.noData}>Aún no tienes transacciones registradas</Text>
          ) : (
            resumen.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.category}>{item.categoria}</Text>
                <Text style={styles.amount}>${item.total.toFixed(2)}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDDCD4',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B97868',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A68677',
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#CFBFB9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#4A3F3F',
    fontWeight: '600',
  },
  amount: {
    fontSize: 20,
    color: '#C38C6B',
    fontWeight: 'bold',
    marginTop: 5,
  },
  noData: {
    textAlign: 'center',
    color: '#A68677',
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#C38C6B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
