import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from '../services/api';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ResumenGraficaScreen() {
  const [tipo, setTipo] = useState('gasto'); // gasto | ingreso
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatos();
  }, [tipo]);

  const fetchDatos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/resumen/graficas?tipo=${tipo}`);
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const colores = [
    '#B97868', '#CFBFB9', '#EDDCD4', '#C38C6B', '#A68677', '#8E6B5E', '#DBC8C4'
  ];

  const dataChart = datos.map((item, index) => ({
    name: item.categoria,
    amount: item.total,
    color: colores[index % colores.length],
    legendFontColor: '#4A3F3F',
    legendFontSize: 14,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gráfica de {tipo === 'gasto' ? 'Gastos' : 'Ingresos'}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.toggle, tipo === 'gasto' && styles.selected]}
          onPress={() => setTipo('gasto')}
        >
          <Text style={styles.toggleText}>Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggle, tipo === 'ingreso' && styles.selected]}
          onPress={() => setTipo('ingreso')}
        >
          <Text style={styles.toggleText}>Ingresos</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#B97868" style={{ marginTop: 30 }} />
      ) : datos.length === 0 ? (
        <Text style={styles.noData}>No hay datos registrados</Text>
      ) : (
        <ScrollView>
          <PieChart
            data={dataChart}
            width={screenWidth}
            height={260}
            chartConfig={{
              color: () => '#4A3F3F',
              labelColor: () => '#4A3F3F',
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="20"
            absolute
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDDCD4',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: '#B97868',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#CFBFB9',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  selected: {
    backgroundColor: '#C38C6B',
  },
  toggleText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  noData: {
    textAlign: 'center',
    color: '#A68677',
    marginTop: 30,
    fontSize: 16,
  },
});
