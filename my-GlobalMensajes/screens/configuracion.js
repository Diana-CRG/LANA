import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronRight,
  HelpCircle,
  Bell,
  Lock,
  User,
  LogOut,
  Heart, // Icono para preferencias
  Clock, // Icono para horario
  GenderMale, // Icono para género (usaremos un genérico de lucide)
} from 'lucide-react-native'; // Importa los iconos necesarios

// Componente para un elemento de configuración
const SettingsItem = ({ icon: Icon, title, onPress, showChevron = true, children }) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress} disabled={!onPress}>
    <View style={styles.settingsItemLeft}>
      {Icon && <Icon size={24} color="#333" style={styles.settingsIcon} />}
      <Text style={styles.settingsItemText}>{title}</Text>
    </View>
    <View style={styles.settingsItemRight}>
      {children}
      {showChevron && onPress && <ChevronRight size={20} color="#999" />}
    </View>
  </TouchableOpacity>
);

// Interfaz de Configuración
const ConfiguracionScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  // Nuevos estados para preferencias de roomie
  const [genderPreference, setGenderPreference] = useState('Cualquiera'); // 'Hombre', 'Mujer', 'Cualquiera'
  const [schedulePreference, setSchedulePreference] = useState('Diurno'); // 'Diurno', 'Nocturno', 'Flexible'
  const [hasPets, setHasPets] = useState(false);
  const [isSmoker, setIsSmoker] = useState(false);
  const [cleanlinessPreference, setCleanlinessPreference] = useState('Normal'); // 'Muy Limpio', 'Normal', 'Relajado'


  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí',
          onPress: () => {
            // Lógica para cerrar sesión
            console.log('Usuario cerró sesión');
            Alert.alert('Sesión Cerrada', 'Has cerrado sesión exitosamente.');
            // Aquí podrías navegar a la pantalla de inicio de sesión
            // navigation.navigate('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Navegar a la pantalla de edición de perfil, incluyendo información personal y de roomie.');
    // navigation.navigate('EditProfile');
  };

  const handlePrivacySettings = () => {
    Alert.alert('Ajustes de Privacidad', 'Navegar a la pantalla de ajustes de privacidad.');
    // navigation.navigate('PrivacySettings');
  };

  const handleAbout = () => {
    Alert.alert('Acerca de Poli-Roomies', 'Información sobre la aplicación y la versión.');
    // navigation.navigate('About');
  };

  // Handlers para las nuevas preferencias de roomie
  const handleGenderPreference = () => {
    Alert.alert(
      'Preferencia de Género',
      'Selecciona el género de tu roomie preferido:',
      [
        { text: 'Hombre', onPress: () => setGenderPreference('Hombre') },
        { text: 'Mujer', onPress: () => setGenderPreference('Mujer') },
        { text: 'Cualquiera', onPress: () => setGenderPreference('Cualquiera') },
      ],
      { cancelable: true }
    );
  };

  const handleSchedulePreference = () => {
    Alert.alert(
      'Preferencia de Horario',
      '¿Qué tipo de horario prefieres para tu roomie?',
      [
        { text: 'Diurno', onPress: () => setSchedulePreference('Diurno') },
        { text: 'Nocturno', onPress: () => setSchedulePreference('Nocturno') },
        { text: 'Flexible', onPress: () => setSchedulePreference('Flexible') },
      ],
      { cancelable: true }
    );
  };

  const handleCleanlinessPreference = () => {
    Alert.alert(
      'Preferencia de Limpieza',
      '¿Qué tan limpio te gustaría que fuera tu roomie?',
      [
        { text: 'Muy Limpio', onPress: () => setCleanlinessPreference('Muy Limpio') },
        { text: 'Normal', onPress: () => setCleanlinessPreference('Normal') },
        { text: 'Relajado', onPress: () => setCleanlinessPreference('Relajado') },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Configuración</Text>

        {/* Sección de Cuenta */}
        <Text style={styles.sectionHeader}>Cuenta</Text>
        <SettingsItem
          icon={User}
          title="Editar Perfil"
          onPress={handleEditProfile}
        />

        {/* Sección de Preferencias de Roomie */}
        <Text style={styles.sectionHeader}>Preferencias de Roomie</Text>
        <SettingsItem
          icon={Heart} // Usamos un icono genérico para preferencias
          title={`Género: ${genderPreference}`}
          onPress={handleGenderPreference}
        />
        <SettingsItem
          icon={Clock}
          title={`Horario: ${schedulePreference}`}
          onPress={handleSchedulePreference}
        />
        <SettingsItem
          icon={Heart}
          title={`Limpieza: ${cleanlinessPreference}`}
          onPress={handleCleanlinessPreference}
        />
        <SettingsItem icon={Heart} title="Tiene Mascotas" showChevron={false}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={hasPets ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setHasPets}
            value={hasPets}
          />
        </SettingsItem>
        <SettingsItem icon={Heart} title="Es Fumador" showChevron={false}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSmoker ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsSmoker}
            value={isSmoker}
          />
        </SettingsItem>
        {/* Aquí podrías añadir más preferencias como intereses comunes, hábitos, etc. */}


        {/* Sección de Notificaciones */}
        <Text style={styles.sectionHeader}>Notificaciones</Text>
        <SettingsItem icon={Bell} title="Habilitar Notificaciones" showChevron={false}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
          />
        </SettingsItem>

        {/* Sección de Privacidad */}
        <Text style={styles.sectionHeader}>Privacidad</Text>
        <SettingsItem
          icon={Lock}
          title="Ajustes de Privacidad"
          onPress={handlePrivacySettings}
        />
        <SettingsItem icon={Lock} title="Modo Privado" showChevron={false}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={privacyMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setPrivacyMode}
            value={privacyMode}
          />
        </SettingsItem>

        {/* Sección de Soporte */}
        <Text style={styles.sectionHeader}>Soporte</Text>
        <SettingsItem
          icon={HelpCircle}
          title="Preguntas Frecuentes"
          onPress={() => navigation.navigate('FAQ')} // Navegar a la pantalla de FAQ
        />
        <SettingsItem
          icon={HelpCircle}
          title="Acerca de Poli-Roomies"
          onPress={handleAbout}
        />
        <SettingsItem
          icon={HelpCircle}
          title="Términos y Condiciones"
          onPress={() => Linking.openURL('https://www.example.com/terms')} // Ejemplo de enlace externo
        />

        {/* Sección de Acción */}
        <SettingsItem
          icon={LogOut}
          title="Cerrar Sesión"
          onPress={handleLogout}
          showChevron={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos específicos para ConfiguracionScreen y SettingsItem
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // blanco
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#001F54', // azul marino
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#B00020', // rojo
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5', // gris muy claro
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#001F54', // azul marino como acento
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    marginRight: 12,
  },
  settingsItemText: {
    fontSize: 16,
    color: '#001F54', // azul marino
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default ConfiguracionScreen;
