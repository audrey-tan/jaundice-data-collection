import { Link } from 'expo-router';
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
import React, { useContext } from 'react';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../_layout.js';
import { StackNavigationProp } from '@react-navigation/stack';


const pageNum = 1;


export default function NewbornDataScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {state, dispatch} = useContext(AppContext);

  const [errorDOB, setErrorDOB] = React.useState("");
  const [textDOB, onChangeTextDOB] = React.useState("");
  const [errorTOB, setErrorTOB] = React.useState("");
  const [textTOB, onChangeTextTOB] = React.useState("");
  const [errorBW, setErrorBW] = React.useState("");
  const [textBW, onChangeTextBW] = React.useState("");
  const [selectedGender, setGender] = React.useState(0);


  function validateDOB(dob: string) {
    if (dob.length == 10 && /^\d\d\d\d-\d\d-\d\d/.test(dob)) {
      const year = parseInt(dob.substring(0, 4));
      const month = parseInt(dob.substring(5, 7));
      const day = parseInt(dob.substring(8, 10));

      const date = new Date(dob);

      if (date.getFullYear() != year || date.getMonth()+1 != month || date.getDate() != day) { // getMonth() starts from 0
        setErrorDOB('Date must be a valid date');
        return false;
      }
      setErrorDOB('');
      return true;
    }
    setErrorDOB('Date must be in YYYY-MM-DD format');
    return false;
  }

function validateTOB(tob : string) {
  if (tob.length == 5 && /^\d\d:\d\d/.test(tob)) {
    const hour = parseInt(tob.substring(0, 2));
    const min = parseInt(tob.substring(3, 5));

    if (0 <= hour && hour < 24 && 0 <= min && min < 60) {
      setErrorTOB('');
      return true;
    }

    setErrorTOB('Time must be a valid time');
    return false;
  }
  setErrorTOB('Time must be in HH:mm format');
  return false;
}

function validateBW(bw : string) {
  if (/^\d+$/.test(bw)) {
    setErrorBW('');
    return true;
  }
  setErrorBW('Birth weight must be a positive integer in grams');
  return false;
}

function next() {
  let goNext = validateDOB(textDOB);
  goNext = validateTOB(textTOB) && goNext; // validate before goNext so that the function is called even when goNext is false
  goNext = validateBW(textBW) && goNext;

  if (goNext) {
    dispatch({type: 'change_page', newValue: pageNum+1})
    dispatch({type: 'change_date', newValue: textDOB})
    dispatch({type: 'change_time', newValue: textTOB})
    dispatch({type: 'change_bw', newValue: parseInt(textBW)})
    dispatch({type: 'change_gender', newValue: selectedGender})
    
    // @ts-ignore
    navigation.navigate("(screens)" + state.pageRoutes[pageNum+1]);
    return;
  }

  // @ts-ignore
  navigation.navigate("(screens)" + state.pageRoutes[pageNum]);
  return;
}


return (
    <View style={styles.innerContainer}>
      <View>
        <Text style={[styles.headingText, {paddingTop: 40}]}>Newborn data</Text>
      </View>
      <View style={styles.innerContainer2}>
        <View style={styles.row}>
          <Input
              labelStyle={styles.label}
              inputStyle={styles.input}
              placeholderTextColor="#B7B7B7"
              label="Date of birth"
              placeholder="YYYY-MM-DD"
              leftIcon={<Icon name="calendar" size={20} color="#B7B7B7"/>}
              inputContainerStyle={styles.inputContainer}
              leftIconContainerStyle={styles.iconContainer}
              onChangeText={onChangeTextDOB}
              errorMessage={errorDOB}
              maxLength={10}
          />
        </View>
        <View style={styles.row}>
          <Input
              labelStyle={styles.label}
              inputStyle={styles.input}
              placeholderTextColor="#B7B7B7"
              label="Time of birth"
              placeholder="HH:mm"
              leftIcon={<Icon name="clock-outline" size={20} color="#B7B7B7"/>}
              inputContainerStyle={styles.inputContainer}
              leftIconContainerStyle={styles.iconContainer}
              onChangeText={onChangeTextTOB}
              errorMessage={errorTOB}
              maxLength={5}
          />
        </View>
        <View style={styles.row}>
          <Input
              labelStyle={styles.label}
              inputStyle={styles.input}
              placeholderTextColor="#B7B7B7"
              label="Birth weight in grams"
              placeholder="eg. 2500"
              leftIcon={<Icon name="scale" size={20} color="#B7B7B7"/>}
              inputContainerStyle={styles.inputContainer}
              leftIconContainerStyle={styles.iconContainer}
              onChangeText={onChangeTextBW}
              errorMessage={errorBW}
              maxLength={4}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, {paddingHorizontal: 8}]}>
            Gender
          </Text>
          <View>
            <CheckBox
              checked={selectedGender === 0}
              onPress={() => setGender(0)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="Female"
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
              checkedColor="#6779D1"
            />
            <CheckBox
              checked={selectedGender === 1}
              onPress={() => setGender(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="Male"
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)", paddingTop: 2}}
              checkedColor="#6779D1"
            />
          </View>
        </View>
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
          onPress={() => next()}
        >
          Next
        </Button>
        
      </View>
    </View>

  );
}
