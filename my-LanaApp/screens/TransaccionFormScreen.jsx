import React, { useState } from 'react';
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

export default function TransaccionFormScreen({ navigation }) {
  const [tipo, setTipo] = useState('gasto');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [id_categoria, setIdCategoria] = useState('');

  const guardarTransaccion = async () => {
    try {
      await axios.post('/transacciones', {
        tipo,
        descripcion,
        monto: parseFloat(monto),
        fecha,
        id_categoria: parseInt(id_categoria),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Verifica los datos');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nueva Transacción</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo (ingreso/gasto)"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Categoría"
        value={id_categoria}
        onChangeText={setIdCategoria}
      />

      <TouchableOpacity style={styles.button} onPress={guardarTransaccion}>
        <Text style={styles.buttonText}>Guardar</Text>
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
