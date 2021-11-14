import { Alert, Box, Button, Heading, NativeBaseProvider } from "native-base"
import { SigninWithGoogle } from "../../../config/redux/action";
import Logo from "../../../assets/badminton-logo.svg";
import React, { useEffect } from "react";
import { connect } from 'react-redux';


const Login = (props) => {

  const SigninWithGoogleHandle = async () => {
    props.SigninWithGoogle().then((res) => {
      if(res){
        props.navigation.push("Union")
      }else{
        props.navigation.push("Login")
      }
 
    }).catch((err) => {
      Alert(err)
    })
  }

  useEffect(() => {
    // Check is Login
    if (props.isLogin) {
      console.log(props.isLogin)
      props.navigation.push("Union")
    }
  }, [])

  return (
    <>
      <NativeBaseProvider>
        <Box flex={1} background="#DBE4F3">
          <Box flex={2} alignItems="center" justifyContent="center">
            <Logo width={180} height={149} />
          </Box>

          <Box flex={2} alignItems="center" width="full">
            <Heading textAlign="center" width="70%">
              Badminton Player Management System
            </Heading>
            <Heading size="xs" color="blue.400" margin="5"> by PB Albani </Heading>
          </Box>

          <Box flex={1} width="100%" alignItems="center">
            {
              props.isLoading ? (
                <Button isLoading isLoadingText="Just a moment" colorScheme="danger" size="30%" width="70%" height="50">
                </Button>
              ) : (
                <Button colorScheme="danger" size="30%" width="70%" height="50" onPress={() => SigninWithGoogleHandle()}>
                  <Heading color="white" size="sm">Sign in with Google</Heading>
                </Button>
              )
            }
          </Box>
        </Box>
      </NativeBaseProvider>
    </>
  );
};

const reduxState = (state) => ({
  isLoading: state.isLoading,
  isLogin: state.isLogin,
})

const reduxDispatch = (dispatch) => ({
  SigninWithGoogle: () => dispatch(SigninWithGoogle()),
})

export default connect(reduxState, reduxDispatch)(Login);

