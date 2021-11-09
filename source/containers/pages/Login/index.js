import { Box, Button, Center, Heading, Icon, InfoOutlineIcon, NativeBaseProvider, Text } from "native-base"
import { SigninWithGoogle } from "../../../config/redux/action";
import Logo from "../../../assets/badminton-logo.svg";
import { connect } from 'react-redux';
import React from "react";


const Login = (props) => {
  
  const SigninWithGoogleHandle =  async () =>{
    props.SigninWithGoogle();
  }

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
          <Button size="30%" width="70%" height="50" onPress={()=>SigninWithGoogleHandle()}>
            <Heading color="white" size="sm">Sign in with Google</Heading> 
          </Button>
        </Box>
      </Box>
    </NativeBaseProvider>
    </>
  );
};

const reduxDispatch = (dispatch) => ({
  SigninWithGoogle : () => dispatch(SigninWithGoogle()),
})

export default connect(null,reduxDispatch)(Login);

