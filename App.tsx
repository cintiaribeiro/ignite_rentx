import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './src/hooks';
import {
  useFonts, 
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import {
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import { Routes } from './src/routes';

import theme from './src/styles/theme'

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return(
    <ThemeProvider theme={theme}>    
      <AppProvider>
        <Routes/>
      </AppProvider>
    </ThemeProvider>
    ) 
  
}


