import { Box, Text, Heading, NativeBaseProvider, HStack, Center, Flex, Image } from "native-base"
import { ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import profile_asset from "../../../assets/profile.png";
import { setUnion } from "../../../config/redux/action";
import Shuttlecock from "../../../assets/shuttlecock.svg";
import Finance from "../../../assets/finance.svg";
import Booking from "../../../assets/booking.svg";
import Members from "../../../assets/member.svg";
import Battle from "../../../assets/battle.svg";
import Players from "../../../assets/union.svg";
import Arrow from "../../../assets/arrow.svg";
import { connect } from 'react-redux';

const Dashboard = (props) => {

    return (
        <>
            <NativeBaseProvider>
                <ScrollView flex={1} background="#DBE4F3">
                    <Box h="60px" justifyContent="center" w="full" shadow="2" background="#FFFFFF">
                        <Flex direction="row" justifyContent="space-between">
                            <Heading size="md" ml="7">Dashboard</Heading>
                            <TouchableOpacity onPress={()=> props.navigation.push("Profile")} 
                                    style={{
                                    position:"absolute",
                                    left:"83%",
                                    bottom:-10
                                    }} >
                                <Image
                                    style={{ width: 40, height: 40 }}
                                    source={profile_asset}
                                    alt="bpms"
                                />
                            </TouchableOpacity>
                        </Flex>
                    </Box>
                    <Box alignItems="center" w="50%" mt="5">
                        <Heading fontWeight="normal">
                            Welcome Back..
                        </Heading>
                    </Box>
                    <Box alignSelf="center" w="89%" mt="2">
                        <Text color="#4D4D4D" fontWeight="bold" fontSize="27"> {props.currentUnion} </Text>
                    </Box>
                    <Box alignSelf="center" width="85%" mt="6">
                        <HStack alignItems="center" justifyContent="space-between">
                            <Center h="115" w="48%" bg="#FF5669" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="0" left="4">
                                    Booking
                                </Heading>
                                <Booking width={32} height={32} style={{ position: "absolute", right: 20, top: 20 }} />
                            </Center>
                            <Center h="115" w="48%" bg="#41D5E4" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="0" left="4">
                                    Players
                                </Heading>
                                <Players width={40} height={40} style={{ position: "absolute", right: 15, top: 15 }} />
                            </Center>
                        </HStack>
                        <HStack alignItems="center" justifyContent="space-between" mt="5">
                            <Center h="115" w="48%" bg="#4F52E2" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="0" left="4">
                                    Shuttlecock
                                </Heading>
                                <Shuttlecock width={38} height={38} style={{ position: "absolute", right: 17, top: 20 }} />
                            </Center>
                            <Center h="115" w="48%" bg="#FF8E37" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="0" left="4">
                                    Match
                                </Heading>
                                <Battle width={38} height={38} style={{ position: "absolute", right: 17, top: 20 }} />
                            </Center>
                        </HStack>
                        <HStack alignItems="center" justifyContent="space-between" mt="5">
                            <Center h="115" w="48%" bg="#00B07D" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="0" left="4">
                                    Members
                                </Heading>
                                <Members width={40} height={40} style={{ position: "absolute", right: 17, top: 15 }} />
                            </Center>
                            <Center h="115" w="48%" bg="#0066B0" rounded="md" shadow={3}>
                                <Heading fontSize="lg" color="#FFFFFF" fontWeight="bold" position="absolute" top="20" right="0" left="4">
                                    Finance
                                </Heading>
                                <Finance width={40} height={40} style={{ position: "absolute", right: 17, top: 15 }} />
                            </Center>
                        </HStack>

                    </Box>
                    <Box mt="10" alignItems="center" w="85%">
                        <Flex direction="row">
                            <Heading size="xl">Shuttlecock Stock</Heading>
                            <Box w="10" h="10" ml="6">
                                <Center
                                    size={16}
                                    bg="#4163E7"
                                    rounded="sm"

                                >
                                    <Text fontSize="2xl" fontWeight="bold" color="#FFFFFF">28</Text>
                                </Center>
                            </Box>
                        </Flex>
                    </Box>
                    <Box mt="10" alignItems="center" w="60%">
                        <Text fontSize="2xl" fontWeight="bold" color="#4D4D4D">This Week Actifity</Text>
                    </Box>
                    <Box mt="2" alignSelf="center" background="#DBDBDB" height="2" w="83%" />
                    <Box mb="7" w="94%" ml="5">
                        <HStack mt="3" alignItems="center">
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Box ml="3">
                                    <Text fontSize="lg" mb="3" fontWeight="bold" color="#4D4D4D">Friday</Text>
                                    <Center h="120px" w="135" bg="#3B2887" rounded="md" shadow={3} >
                                        <Text fontSize="lg" position="absolute" left="3" top="4" fontWeight="bold" color="#FFFFFF">Agape</Text>
                                        <Text fontSize="md" position="absolute" right="0" left="13" top="86" fontWeight="bold" color="#FFFFFF">Detail</Text>
                                        <Arrow width={20} height={20} style={{ position: "absolute", right: 17, top: 88 }} />
                                    </Center>
                                </Box>
                                <Box ml="3">
                                    <Text fontSize="lg" mb="3" fontWeight="bold" color="#4D4D4D">Friday</Text>
                                    <Center h="120px" w="135" bg="#3B2887" rounded="md" shadow={3} >
                                        <Text fontSize="lg" position="absolute" left="3" top="4" fontWeight="bold" color="#FFFFFF">PB 06</Text>
                                        <Text fontSize="md" position="absolute" right="0" left="13" top="86" fontWeight="bold" color="#FFFFFF">Detail</Text>
                                        <Arrow width={20} height={20} style={{ position: "absolute", right: 17, top: 88 }} />
                                    </Center>
                                </Box>
                                <Box ml="3">
                                    <Text fontSize="lg" mb="3" fontWeight="bold" color="#4D4D4D">Friday</Text>
                                    <Center h="120px" w="135" bg="#3B2887" rounded="md" shadow={3} >
                                        <Text fontSize="lg" position="absolute" left="3" top="4" fontWeight="bold" color="#FFFFFF">PB 06</Text>
                                        <Text fontSize="md" position="absolute" right="0" left="13" top="86" fontWeight="bold" color="#FFFFFF">Detail</Text>
                                        <Arrow width={20} height={20} style={{ position: "absolute", right: 17, top: 88 }} />
                                    </Center>
                                </Box>
                            </ScrollView>
                        </HStack>
                    </Box>
                </ScrollView>
            </NativeBaseProvider>
        </>
    );
};

const reduxState = (state) => ({
    currentUnion: state.currentUnion,
})

const reduxDispatch = (dispatch) => ({
    //   setUnion: (item) => dispatch(setUnion(item)),
})


export default connect(reduxState, reduxDispatch)(Dashboard);

