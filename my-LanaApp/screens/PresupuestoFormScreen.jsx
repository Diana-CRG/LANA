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

export default function PresupuestoFormScreen({ route, navigation }) {
  const presupuesto = route.params?.presupuesto;

  const [monto, setMonto] = useState(presupuesto?.monto?.toString() || '');
  const [fecha_crea, setFechaCrea] = useState(presupuesto?.fecha_crea || '');
  const [fecha_venc, setFechaVenc] = useState(presupuesto?.fecha_venc || '');
  const [id_categoria, setIdCategoria] = useState(presupuesto?.id_categoria?.toString() || '');

  const guardar = async () => {
    if (!monto || !fecha_crea || !fecha_venc || !id_categoria) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const data = {
      monto: parseFloat(monto),
      fecha_crea,
      fecha_venc,
      id_categoria: parseInt(id_categoria),
    };

    try {
      if (presupuesto) {
        await axios.put(`/presupuestos/${presupuesto.id_presupuesto}`, data);
        Alert.alert('Actualizado', 'Presupuesto actualizado correctamente');
      } else {
        await axios.post('/presupuestos', data);
        Alert.alert('Guardado', 'Presupuesto creado correctamente');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {presupuesto ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha inicio (YYYY-MM-DD)"
        value={fecha_crea}
        onChangeText={setFechaCrea}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha fin (YYYY-MM-DD)"
        value={fecha_venc}
        onChangeText={setFechaVenc}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Categoría"
        value={id_categoria}
        onChangeText={setIdCategoria}
      />

      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>
          {presupuesto ? 'Actualizar' : 'Guardar'}
        </Text>
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
