import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, ChevronUp } from 'lucide-react-native'; // Importa solo los iconos necesarios

// Componente para un elemento de Pregunta Frecuente (FAQ)
const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.faqQuestionContainer}>
        <Text style={styles.faqQuestion}>{question}</Text>
        {expanded ? <ChevronUp size={20} color="#333" /> : <ChevronDown size={20} color="#333" />}
      </TouchableOpacity>
      {expanded && <Text style={styles.faqAnswer}>{answer}</Text>}
    </View>
  );
};

// Interfaz de Preguntas Frecuentes
const FAQScreen = () => {
  const faqs = [
    {
      question: '¿Cómo puedo encontrar un roomie?',
      answer: 'Puedes usar la función de búsqueda y filtrado para encontrar posibles compañeros de piso según tus preferencias. También te sugeriremos roomies compatibles.',
    },
    {
      question: '¿Cómo funciona el sistema de mensajería?',
      answer: 'Una vez que encuentres un roomie potencial, puedes iniciar una conversación a través de nuestra plataforma de mensajería segura para coordinar y conocerse mejor.',
    },
    {
      question: '¿Puedo dejar reseñas sobre mis roomies anteriores?',
      answer: 'Sí, nuestra plataforma te permite dejar reseñas y calificaciones sobre tus experiencias con compañeros de piso anteriores para ayudar a otros usuarios.',
    },
    {
      question: '¿Cómo garantizan mi seguridad y privacidad?',
      answer: 'Implementamos medidas de seguridad robustas para proteger tus datos personales y ofrecemos procesos de verificación de identidad para mayor confianza.',
    },
    {
      question: '¿Qué hago si tengo un problema con la aplicación?',
      answer: 'Puedes contactar a nuestro equipo de soporte a través de la sección "Soporte" en la configuración de la aplicación. Estamos aquí para ayudarte.',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Preguntas Frecuentes</Text>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos específicos para FAQScreen y FAQItem
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
  faqItem: {
    backgroundColor: '#F5F5F5', // gris claro
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#B00020', // rojo como acento
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001F54', // azul marino
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    lineHeight: 20,
  },
});


export default FAQScreen;