// import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import {AppContext, AppProvider} from './Context.js';
import Layout from './(screens)/Layout.js';
import { color } from '@rneui/base';
import { View, StyleSheet, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './(screens)/index';
import NewbornDataScreen from './(screens)/nd';
import FatherDataScreen from './(screens)/fd';
import MotherDataScreen from './(screens)/md';
import KramerScreen from './(screens)/kramer';
import UploadScreen from './(screens)/upload';
import SuccessScreen from './(screens)/success';
import CameraScreen from './(screens)/camera';
import ExpectedScreen from './(screens)/expected';


export type RootStackParamList = {
  "(screens)/index": undefined;
  "(screens)/nd": undefined;
  "(screens)/fd": undefined;
  "(screens)/md": undefined;
  "(screens)/kramer": undefined;
  "(screens)/upload": undefined;
  "(screens)/success": undefined;
  "(screens)/camera": undefined;
  "(screens)/expected": undefined;
};


const Stack = createStackNavigator<RootStackParamList>();


export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppProvider>
      <Layout>
        <Stack.Navigator>
          <Stack.Screen name="(screens)/index" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="(screens)/nd" component={NewbornDataScreen} options={{headerShown: false}}/>
          <Stack.Screen name="(screens)/fd" component={FatherDataScreen} options={{headerShown: false}}/>
          <Stack.Screen name="(screens)/md" component={MotherDataScreen} options={{headerShown: false}}/>
          <Stack.Screen name="(screens)/kramer" component={KramerScreen} options={{headerShown: false}}/>
          <Stack.Screen name="(screens)/upload" component={UploadScreen} options={{headerShown: false}}/>
          <Stack.Screen name="(screens)/success" component={SuccessScreen} options={{headerShown: false}}/>
          <Stack.Screen name="(screens)/camera" component={CameraScreen} options={{headerShown: false}}/>
          <Stack.Screen name="(screens)/expected" component={ExpectedScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </Layout>
    </AppProvider>
  );
}
