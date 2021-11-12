import { Box, Button, Heading, NativeBaseProvider } from "native-base"
import { setUnion } from "../../../config/redux/action";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

const UnionMenu = (props) => {

  const [union, setUnion] = useState([]);


  useEffect(() => {
    setUnion(props.badminton_union)
  }, [])

  const getUnion = (item) => {
    props.setUnion(item);
    props.navigation.push("Dashboard");
  }

  return (
    <>
      <NativeBaseProvider>
        <Box flex={1} background="#DBE4F3" justifyContent="center">
          <Box alignItems="center">
            {
              union.map((item, i) => (
                <Button key={i} value={item} onPress={() => getUnion(item)} colorScheme="info" size="md" w="80%" h="20" mt="6" >
                  <Heading color="white" size="lg">            
                    {item}
                  </Heading>
                </Button>
              )
              )
            }
          </Box>
        </Box>
      </NativeBaseProvider>
    </>
  );
};

const reduxState = (state) => ({
  badminton_union: state.badminton_union,
})

const reduxDispatch = (dispatch) => ({
  setUnion: (item) => dispatch(setUnion(item)),
})


export default connect(reduxState, reduxDispatch)(UnionMenu);

