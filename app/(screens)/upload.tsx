import { Link, useNavigation } from 'expo-router';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, LinearProgress, Image } from '@rneui/themed';
import { CheckBox, Input } from '@rneui/base';
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles.js';
import Layout from './Layout.js';
import {AppContext} from '../Context.js';
import React, { useContext } from 'react';
import { RootStackParamList } from '../_layout.js';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';


const pageNum = 7;

// const URL = '';

export default function UploadScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {state, dispatch} = useContext(AppContext);
  const [uploading, setUploading] = React.useState(false);

  const data = {
    dateOfBirth: state.dateOfBirth,
    timeOfBirth: state.timeOfBirth,
    birthWeight: state.birthWeight,
    gender: state.gender,
    fSkinTone: state.fSkinTone,
    mSkinTone: state.mSkinTone,
    kramer: state.kramer,
    foreheads: state.foreheads,
    jaundice: state.jaundice,
    bilirubin: state.bilirubin
}
  
    
  function submit() {
    const URL = `${state.serverUrl}/newborn/`;
    setUploading(true);
    axios.post(URL, data)
      .then(response => {
        console.log(response.data);
        setUploading(false);
        dispatch({type: 'change_page', newValue: pageNum+1})
        // @ts-ignore
        navigation.navigate("(screens)" + state.pageRoutes[pageNum+1]);
      })
      .catch(error => {
        // console.error("Error posting: " + error.response.data);
        if (error.response) console.log("error response ", error.response.data)
        else if (error.request) console.log("error request ", error.request)
        else console.log("error message ", error.message)
        setUploading(false);
      })
  }

  
  

  return (
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View></View>
        <View>
          {
            uploading ? 
              <Text style={[styles.headingText, {paddingTop: 0}]}>Uploading...</Text>
            : 
              <>
                <Text style={[styles.headingText, {paddingTop: 0}]}>Upload data</Text>
                <Text style={[styles.subheadingText, {paddingTop: 16, paddingBottom: 0}]}>Press submit below to upload</Text>
              </>
          }
        </View>
        <View style={styles.buttonContainer}>
          <Link href={state.pageRoutes[pageNum-1]} asChild> 
            <Button 
              type="outline"
              radius={7}
              titleStyle={{fontFamily: "Roboto-Medium", color: "#6779D1"}}
              buttonStyle={{width: 145, alignSelf: "flex-start", borderWidth: 1.2, borderColor: "#6779D1"}}
              onPress={() => dispatch({type: 'change_page', newValue: pageNum-1})}
              disabled={uploading}
            >
              Previous
            </Button>
          </Link>
          <Button 
            ViewComponent={LinearGradient} 
            linearGradientProps={{
              colors: ["#494FA0", "#6779D1"],
              start: { x: 0, y: 0.5},
              end: { x: 0.6, y: 0.5 },
              height: 43
            }}
            radius={7}
            titleStyle={{fontFamily: "Roboto-Medium"}}
            buttonStyle={{width: 145, alignSelf: "flex-end"}}
            raised={true}
            onPress={() => submit()}
            disabled={uploading}
          >
            SUBMIT
          </Button>
        </View>
      </ScrollView>
  );
}