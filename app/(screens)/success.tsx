import { Link } from 'expo-router';
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
import React, { useContext } from 'react';


const pageNum = 8;


export default function SuccessScreen() {
  const {state, dispatch} = useContext(AppContext);
  

  return (
      <View style={styles.innerContainer}>
        <View></View>
        <View style={{alignItems: "center"}}>
          <LottieView
            source={require('../../assets/images/checkmark.json')}
            style={{width: 320, height: 320}}
            autoPlay
          />
          <Text style={[styles.headingText, {paddingTop: 0, textAlign: "center", lineHeight: 38}]}>Successfully{'\n'}uploaded</Text>
        </View>
        <View style={{paddingHorizontal: 6, paddingBottom: 36}}>
          <Link href={state.pageRoutes[0]} asChild> 
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
              onPress={() => dispatch({type: 'change_page', newValue: 0})}
            >
              Back to home screen
            </Button>
          </Link>
          
        </View>
      </View>
  );
}