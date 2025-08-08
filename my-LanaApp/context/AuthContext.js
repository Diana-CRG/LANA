import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../services/api';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      const savedName = await AsyncStorage.getItem('userName');
      if (savedToken) {
        setToken(savedToken);
        setUserName(savedName || '');
      }
    };
    loadToken();
  }, []);

  const login = async (jwtToken) => {
    setToken(jwtToken);
    await AsyncStorage.setItem('token', jwtToken);

    // decodifica el token o haz una llamada opcional para obtener el nombre
    try {
      const res = await axios.get('/resumen/categorias'); // solo para validar
      setUserName('Usuario'); // reemplazar por consulta real
      await AsyncStorage.setItem('userName', 'Usuario');
    } catch {
      setUserName('');
    }
  };

  const logout = async () => {
    setToken(null);
    setUserName('');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
