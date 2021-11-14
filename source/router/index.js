import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from "@react-native-community/netinfo";
import Profile_asset from "../assets/profile.png";
import React, { Fragment, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

import { Dashboard, Login, UnionMenu, Profile, Bookings } from '../containers/pages'

const Router = (props) => {
  
  const unsubscribe = () => {
    NetInfo.addEventListener(state => {
     if (!state.isConnected) {
       Alert.alert(
         "Infomation",
         "Sorry Please Check your internet Connection",
       )
     }
   });
  }
  
  useEffect(() => {
    unsubscribe();
  }, [])

  return (
    <Fragment>
      <Spinner visible={props.isLoadingFull} />
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Union" options={{ title: 'Choose Badminton Union', headerBackVisible: false }} component={UnionMenu} />
        <Stack.Screen name="Dashboard" options={{
          headerShown: false,
          headerBackVisible: false,
        }} component={Dashboard} tes="123" />

        <Stack.Screen name="Profile" options={{ title: 'Profile' }} component={Profile} />
        <Stack.Screen name="Booking" options={{ title: 'Booking' }} component={Bookings} />

      </Stack.Navigator>
    </Fragment>
  )

}

const reduxState = (state) => ({
  isLoadingFull: state.isLoadingFull,
})

export default connect(reduxState, null)(Router);