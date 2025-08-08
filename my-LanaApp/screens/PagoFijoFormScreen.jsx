import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from '../services/api';

export default function PagoFijoFormScreen({ route, navigation }) {
  const pagoFijo = route.params?.pagoFijo;

  const [descripcion, setDescripcion] = useState(pagoFijo?.descripcion || '');
  const [monto, setMonto] = useState(pagoFijo?.monto?.toString() || '');
  const [fecha_inicio, setFechaInicio] = useState(pagoFijo?.fecha_inicio || '');
  const [activo, setActivo] = useState(pagoFijo?.activo || false);
  const [categoria_id_categoria, setCategoriaId] = useState(
    pagoFijo?.categoria_id?.toString() || ''
  );

  const guardar = async () => {
    if (!descripcion || !monto || !fecha_inicio || !categoria_id_categoria) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const data = {
      descripcion,
      monto: parseFloat(monto),
      fecha_inicio,
      activo,
      categoria_id_categoria: parseInt(categoria_id_categoria),
    };

    try {
      if (pagoFijo) {
        await axios.put(`/pagosFijos/${pagoFijo.id_pago_fijo}`, data);
        Alert.alert('Actualizado', 'Pago fijo actualizado correctamente');
      } else {
        await axios.post('/pagosFijos', data);
        Alert.alert('Guardado', 'Pago fijo registrado correctamente');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {pagoFijo ? 'Editar Pago Fijo' : 'Nuevo Pago Fijo'}
      </Text>

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
        placeholder="Fecha de inicio (YYYY-MM-DD)"
        value={fecha_inicio}
        onChangeText={setFechaInicio}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Categoría"
        value={categoria_id_categoria}
        onChangeText={setCategoriaId}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Activo:</Text>
        <Switch
          value={activo}
          onValueChange={setActivo}
          thumbColor={activo ? '#C38C6B' : '#CFBFB9'}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>
          {pagoFijo ? 'Actualizar' : 'Guardar'}
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: { color: '#4A3F3F', marginRight: 10, fontSize: 16 },
  button: {
    backgroundColor: '#C38C6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
