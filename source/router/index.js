import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import React,  { Fragment }  from 'react';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

import { Login, UnionMenu } from '../containers/pages'

const Router = (props) =>{
    return (
      <Fragment>
        {/* <Spinner visible={props.isLoading}/> */}
        <Stack.Navigator>        
              <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
              <Stack.Screen name="Union" options={{ title: 'Badminton Union', headerBackVisible:false }} component={UnionMenu} />  
        </Stack.Navigator>
      </Fragment>
    ) 
  
  }

const reduxState = (state) =>({
    isLoading : state.isLoading,
})

export default connect(reduxState,null)(Router);