import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from '../services/api';

export default function EditarTransaccionScreen({ route, navigation }) {
  const { id } = route.params;
  const [transaccion, setTransaccion] = useState({
    tipo: '',
    descripcion: '',
    monto: '',
    fecha: '',
    id_categoria: '',
  });

  useEffect(() => {
    fetchTransaccion();
  }, []);

  const fetchTransaccion = async () => {
    try {
      const response = await axios.get(`/transacciones/${id}`);
      setTransaccion(response.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la transacción');
    }
  };

  const actualizar = async () => {
    try {
      await axios.put(`/transacciones/${id}`, transaccion);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar');
    }
  };

  const handleChange = (field, value) => {
    setTransaccion({ ...transaccion, [field]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Editar Transacción</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo (ingreso/gasto)"
        value={transaccion.tipo}
        onChangeText={(text) => handleChange('tipo', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={transaccion.descripcion}
        onChangeText={(text) => handleChange('descripcion', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={String(transaccion.monto)}
        onChangeText={(text) => handleChange('monto', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={transaccion.fecha}
        onChangeText={(text) => handleChange('fecha', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Categoría"
        value={String(transaccion.id_categoria)}
        onChangeText={(text) => handleChange('id_categoria', text)}
      />

      <TouchableOpacity style={styles.button} onPress={actualizar}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EDDCD4', padding: 20 },
  title: { fontSize: 24, color: '#B97868', fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#CFBFB9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#4A3F3F',
  },
  button: {
    backgroundColor: '#C38C6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
