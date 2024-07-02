import 'react-native-gesture-handler';
import { Link, useNavigation } from 'expo-router';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, LinearProgress, Image } from '@rneui/themed';
import { CheckBox, Input } from '@rneui/base';
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles.js';
import Layout from './Layout.js';
import LottieView from 'lottie-react-native';
import {AppContext} from '../Context.js';
import React, { useContext, useEffect } from 'react';
import { RootStackParamList } from '../_layout.js';
import { StackNavigationProp } from '@react-navigation/stack';


const pageNum = 0;


export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const {state, dispatch} = useContext(AppContext);


  function onScreenLoad() {
    dispatch({type: 'change_page', newValue: pageNum})
    dispatch({type: 'change_date', newValue: ""})
    dispatch({type: 'change_time', newValue: ""})
    dispatch({type: 'change_bw', newValue: ""})
    dispatch({type: 'change_gender', newValue: 0})
    dispatch({type: 'change_fSkinTone', newValue: 1})
    dispatch({type: 'change_mSkinTone', newValue: 1})
    dispatch({type: 'change_kramer', newValue: 0})
    dispatch({type: 'clear_foreheads'})
    dispatch({type: 'change_jaundice', newValue: 0})
    dispatch({type: 'change_bilirubin', newValue: 0})
  }

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      onScreenLoad();
    });
    return unsubcribe;
  }, [])
  

  return (
        <View style={styles.innerContainer}>
          <View></View>
          <View style={{alignItems: "center"}}>
            <Image
              source={require('../../assets/images/baby.png')}
              style={{width: 230, height: 204.5, marginBottom: 90, marginTop: 100}}
            />
            <Text style={[styles.headingText, {paddingTop: 0, textAlign: "center", fontSize: 36}]}>Add new data</Text>
            <Text style={[styles.subheadingText, {paddingTop: 16, paddingBottom: 0, textAlign: "center"}]}>Number of data added: 0</Text>
          </View>
          <View style={{paddingHorizontal: 6, paddingBottom: 36}}>
            <Link href={state.pageRoutes[pageNum+1]} asChild> 
              <Button 
                ViewComponent={LinearGradient} 
                linearGradientProps={{
                  colors: ["#494FA0", "#6779D1"],
                  start: { x: 0, y: 0.5},
                  end: { x: 0.6, y: 0.5 },
                }}
                size="lg"
                radius={8}
                titleStyle={{fontFamily: "Roboto-Medium"}}
                raised={true}
                onPress={() => dispatch({type: 'change_page', newValue: pageNum+1})}
              >
                Start
              </Button>
            </Link>
            
          </View>
        </View>
  );
}