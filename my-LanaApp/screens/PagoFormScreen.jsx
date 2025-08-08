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

export default function PagoFormScreen({ route, navigation }) {
  const pago = route.params?.pago;

  const [descripcion, setDescripcion] = useState(pago?.descripcion || '');
  const [monto, setMonto] = useState(pago?.monto?.toString() || '');
  const [fecha_pago, setFechaPago] = useState(pago?.fecha_pago || '');
  const [metodo_pago, setMetodoPago] = useState(pago?.metodo_pago || '');
  const [categoria_id_categoria, setCategoriaId] = useState(
    pago?.categoria_id_categoria?.toString() || ''
  );

  const guardar = async () => {
    if (!descripcion || !monto || !fecha_pago || !categoria_id_categoria) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const data = {
      descripcion,
      monto: parseFloat(monto),
      fecha_pago,
      metodo_pago,
      categoria_id_categoria: parseInt(categoria_id_categoria),
    };

    try {
      if (pago) {
        await axios.put(`/pagos/${pago.id_pago}`, data);
        Alert.alert('Actualizado', 'Pago actualizado correctamente');
      } else {
        await axios.post('/pagos', data);
        Alert.alert('Guardado', 'Pago registrado correctamente');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {pago ? 'Editar Pago' : 'Nuevo Pago'}
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
        placeholder="Fecha de pago (YYYY-MM-DD)"
        value={fecha_pago}
        onChangeText={setFechaPago}
      />
      <TextInput
        style={styles.input}
        placeholder="Método de pago"
        value={metodo_pago}
        onChangeText={setMetodoPago}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Categoría"
        value={categoria_id_categoria}
        onChangeText={setCategoriaId}
      />

      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>
          {pago ? 'Actualizar' : 'Guardar'}
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
