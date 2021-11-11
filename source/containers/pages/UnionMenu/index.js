import { Alert, Box, Button, Center, Divider, Heading, Icon, InfoOutlineIcon, NativeBaseProvider, Text, VStack } from "native-base"
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";

const UnionMenu = (props) => {

  const [union, setUnion] = useState([]);

    useEffect(()=>{
      setUnion(props.badminton_union)
    },[])
  return (
    <>
     <NativeBaseProvider>
      <Box flex={1} background="#DBE4F3" justifyContent="center">
            <Box alignItems="center">
              {
                union.map((item,i)=>(
                      <Button key={i} colorScheme="danger" size="lg" w="80%" h="20" mt="4">
                        <Heading color="white" size="md">{item}</Heading> 
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

const reduxState = (state) =>({
  badminton_union : state.badminton_union,
})

export default connect(reduxState,null)(UnionMenu);

