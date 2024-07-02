import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, LinearProgress } from '@rneui/themed';
import styles from '../styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import {AppContext, AppProvider} from '../Context.js';
import React, { useContext } from 'react';


const Layout = ({children}) => {
    const {state, dispatch} = useContext(AppContext);

    const numberOfPages = state.pageRoutes.length-1;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.linearProgressContainer}>
                    <View>
                        <LinearProgress 
                            color="#BBC5F5"
                            trackColor="#DFDFDF"
                            value={1/numberOfPages*state.page}
                        />
                    </View>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1/numberOfPages*state.page*0.5, y: 0 }}
                        locations={[0, 1]}
                        colors={["#6779D1", "rgba(0,0,0,0)"]}
                        style={{position: 'absolute', top: 42, bottom: 0, left: 34, right: 0}}
                    />
                </View>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default Layout