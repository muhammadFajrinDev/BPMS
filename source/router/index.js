import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import Profile_asset from "../assets/profile.png";
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

import { Dashboard, Login, UnionMenu, Profile } from '../containers/pages'


const Router = (props) => {

  return (
    <Fragment>
      <Spinner visible={props.isLoadingFull}/>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Union" options={{ title: 'Choose Badminton Union', headerBackVisible: false }} component={UnionMenu} />
        <Stack.Screen name="Dashboard" options={{
          headerShown: false,
          headerBackVisible: false,
        }} component={Dashboard} tes="123"/>
        
        <Stack.Screen name="Profile" options={{ title: 'Profile' }} component={Profile} />
      </Stack.Navigator>
    </Fragment>
  )

}

const reduxState = (state) => ({
  isLoadingFull: state.isLoadingFull,
})

export default connect(reduxState, null)(Router);