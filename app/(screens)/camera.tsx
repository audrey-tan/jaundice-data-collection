import { Link, useNavigation } from 'expo-router';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, LinearProgress } from '@rneui/themed';
import { CheckBox, Input } from '@rneui/base';
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles.js';
import Layout from './Layout.js';
import {AppContext} from '../Context.js';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { RootStackParamList } from '../_layout.js';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';


const pageNum = 5;


export default function CameraScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {state, dispatch} = useContext(AppContext);

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePicture() {
    dispatch({type: 'clear_foreheads'});

    


    let photo;
    for (let i = 0; i < 3; i++) {
      photo = await cameraRef.current?.takePictureAsync({ base64: true });
      dispatch({type: 'add_forehead', newValue: photo?.base64});
    }

    dispatch({type: 'change_page', newValue: pageNum+1})

    // @ts-ignore
    navigation.navigate("(screens)" + state.pageRoutes[pageNum+1]);
    return;
  }

  return (
      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.headingText, {paddingTop: 40}]}>Forehead</Text>
          <Text style={[styles.subheadingText, {paddingTop: 20, paddingBottom: 1}]}>Place the color card on the newborn's forehead and take a picture</Text>
        </View>
        <View style={styles.innerContainer2}>
          <CameraView 
            style={{width: "100%", height: 400, marginBottom: 10, justifyContent: "flex-end"}} 
            ref={cameraRef}
          >
            <TouchableOpacity
              onPress={takePicture}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                backgroundColor: "#F9F9F9",
                alignSelf: "center",
                marginBottom: 24
              }}
            />
          </CameraView>
        </View>
        <View style={styles.buttonContainer}>
          <Link href={state.pageRoutes[pageNum-1]} asChild> 
            <Button 
              type="outline"
              radius={7}
              titleStyle={{fontFamily: "Roboto-Medium", color: "#6779D1"}}
              buttonStyle={{width: 145, alignSelf: "flex-start", borderWidth: 1.2, borderColor: "#6779D1"}}
              onPress={() => dispatch({type: 'change_page', newValue: pageNum-1})}
            >
              Previous
            </Button>
          </Link>          
        </View>
      </View>

  );
}