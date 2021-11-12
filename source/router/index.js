import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import Profile from "../assets/profile.png";
import React, { Fragment } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

import { Dashboard, Login, UnionMenu } from '../containers/pages'


const Router = (props) => {
  return (
    <Fragment>
      {/* <Spinner visible={props.isLoading}/> */}
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Union" options={{ title: 'Choose Badminton Union', headerBackVisible: false }} component={UnionMenu} />
        <Stack.Screen name="Dashboard" options={{
          headerBackVisible: false,
          headerRight: () => (
          <TouchableOpacity onPress={() => alert('This is a button!')}>
            <Image
              style={{ width: 40, height: 40 }}
              source={Profile}
            />
          </TouchableOpacity>
          ),

        }} component={Dashboard} />
      </Stack.Navigator>
    </Fragment>
  )

}

const reduxState = (state) => ({
  isLoading: state.isLoading,
})

export default connect(reduxState, null)(Router);