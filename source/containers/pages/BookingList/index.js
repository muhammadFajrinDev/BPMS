import { Box, Text, Spacer, Flex,NativeBaseProvider, Pressable, HStack, Badge } from "native-base"
import { setUnion } from "../../../config/redux/action";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

const BookingList = (props) => {

    //   const [union, setUnion] = useState([]);

    //   useEffect(() => {
    //     setUnion(props.badminton_union)
    //   }, [])

    //   const getUnion = (item) => {
    //     props.setUnion(item);
    //     props.navigation.push("Dashboard");
    //   }

    return (
        <>
            <NativeBaseProvider>
                <Box flex={1} background="#DBE4F3">
                    <Box alignItems="center">
                        <Badge variant="solid" mt={10}>
                            <Text color="white" fontWeight="bold">2021-11-29</Text>
                        </Badge>
                        <Pressable mt={5} width="90%">
                            {({ isHovered, isFocused, isPressed }) => {
                                return (
                                    <Box
                                        bg={isPressed ? "cyan.900" : isHovered ? "cyan.800" : "cyan.700"}
                                        p="5"
                                        rounded="8"
                                        style={{
                                            transform: [
                                                {
                                                    scale: isPressed ? 0.96 : 1,
                                                },
                                            ],
                                        }}
                                    >
                                        <HStack alignItems="flex-start">
                                            <Text fontSize={12} color="cyan.50" fontWeight="medium">
                                                Requester : Abi Dunda
                                            </Text>
                                            <Spacer />
                                            <Text fontSize={10} color="cyan.100">
                                                1 Hours ago
                                            </Text>
                                        </HStack>
                                        <Text color="cyan.50" mt="3" fontWeight="medium" fontSize={20}>
                                            AGAPE Tanah Seratus
                                        </Text>
                                        <Text mt="2" fontSize={14} color="cyan.100">
                                           Time : 21:00 - 22:00
                                        </Text>

                                        <Flex>
                                            {isFocused ? (
                                                <Text
                                                    mt="2"
                                                    fontSize={12}
                                                    fontWeight="medium"
                                                    bg="cyan.500"
                                                    color="cyan.200"
                                                    alignSelf="flex-start"
                                                >
                                                    Read More
                                                </Text>
                                            ) : (
                                                <Text mt="2" fontSize={12} fontWeight="medium" color="cyan.400">
                                                    Read More
                                                </Text>
                                            )}
                                        </Flex>
                                    </Box>
                                )
                            }}
                        </Pressable>

                    </Box>
                </Box>
            </NativeBaseProvider>
        </>
    );
};

const reduxState = (state) => ({
    //   badminton_union: state.badminton_union,
})

const reduxDispatch = (dispatch) => ({
    //   setUnion: (item) => dispatch(setUnion(item)),
})


export default connect(reduxState, reduxDispatch)(BookingList);

