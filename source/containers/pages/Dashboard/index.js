import { Box, Text, Heading, NativeBaseProvider, HStack, Center } from "native-base"
import { setUnion } from "../../../config/redux/action";
import Shuttlecock from "../../../assets/shuttlecock.svg";
import Booking from "../../../assets/booking.svg";
import Members from "../../../assets/member.svg";
import Battle from "../../../assets/battle.svg";
import Players from "../../../assets/union.svg";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

const Dashboard = (props) => {

    return (
        <>
            <NativeBaseProvider>
                <Box flex={1} background="#DBE4F3">
                    <Box alignItems="center" w="50%" mt="10">
                        <Heading fontWeight="normal">
                            Welcome Back..
                        </Heading>
                    </Box>
                    <Box alignItems="center" w="83%" mt="2">
                        <Text color="#4D4D4D" fontWeight="bold" fontSize="27"> {props.user.name} </Text>
                    </Box>
                    <Box alignSelf="center" width="85%" mt="6">
                        <HStack alignItems="center" justifyContent="space-between">
                            <Center h="115" w="48%" bg="#FF5669" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="90">
                                    Booking
                                </Heading>
                                <Booking width={32} height={32} style={{ position: "absolute", right: 20, top: 20 }} />
                            </Center>
                            <Center h="115" w="48%" bg="#41D5E4" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="90">
                                    Players
                                </Heading>
                                <Players width={40} height={40} style={{ position: "absolute", right: 15, top: 15 }} />
                            </Center>
                        </HStack>
                        <HStack alignItems="center" justifyContent="space-between" mt="5">
                            <Center h="115" w="48%" bg="#4F52E2" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="60">
                                    Shuttlecock
                                </Heading>
                                <Shuttlecock width={38} height={38} style={{ position: "absolute", right: 17, top: 20 }} />
                            </Center>
                            <Center h="115" w="48%" bg="#FF8E37" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="60">
                                    Tournament
                                </Heading>
                                <Battle width={38} height={38} style={{ position: "absolute", right: 17, top: 20 }} />
                            </Center>
                        </HStack>
                        <HStack alignItems="center" justifyContent="space-between" mt="5">
                            <Center h="115" w="48%" bg="#00B07D" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="78">
                                    Members
                                </Heading>
                                <Members width={40} height={40} style={{ position: "absolute", right: 17, top: 15 }} />
                            </Center>
                        </HStack>
                    </Box>
                </Box>
            </NativeBaseProvider>
        </>
    );
};

const reduxState = (state) => ({
    user: state.user,
})

const reduxDispatch = (dispatch) => ({
    //   setUnion: (item) => dispatch(setUnion(item)),
})


export default connect(reduxState, reduxDispatch)(Dashboard);

