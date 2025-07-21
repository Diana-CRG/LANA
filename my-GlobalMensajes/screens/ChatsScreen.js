import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const chats = [
  {
    id: '1',
    nombre: 'Luis Ramírez',
    mensaje: '¡Hola! ¿Cómo estás?',
    hora: '10:45 a.m.',
    avatar: require('../assets/avatar1.png'),
  },
  {
    id: '2',
    nombre: 'Grupo Polirromies',
    mensaje: 'Nueva tarea publicada, revisa el grupo.',
    hora: '9:30 a.m.',
    avatar: require('../assets/group.png'),
  },
  {
    id: '3',
    nombre: 'Ana Torres',
    mensaje: '¿Ya enviaste el reporte de hoy?',
    hora: 'Ayer',
    avatar: require('../assets/avatar2.png'),
  },
  {
    id: '4',
    nombre: 'Carlos Mendoza',
    mensaje: 'Nos vemos en la reunión a las 5, ¡no faltes!',
    hora: 'Lunes',
    avatar: require('../assets/avatar1.png'),
  },
  {
    id: '5',
    nombre: 'Equipo Roomies',
    mensaje: 'Recordatorio: pago de renta este viernes.',
    hora: 'Domingo',
    avatar: require('../assets/group.png'),
  },
];

const ChatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.time}>{item.hora}</Text>
              </View>
              <Text style={styles.message} numberOfLines={1}>{item.mensaje}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F54',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002244',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 10,
  },
  message: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default ChatsScreen;
