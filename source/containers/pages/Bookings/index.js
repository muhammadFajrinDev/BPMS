import { Box, Button, FormControl, Heading, Input, NativeBaseProvider, Stack, ScrollView, Flex, Select, CheckIcon, WarningOutlineIcon } from "native-base"
import DateTimePicker from '@react-native-community/datetimepicker';
import { getPBFull } from "../../../config/redux/action";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

const Booking = (props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // get Data
    const [datetime, setSatetime] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {

    }, [])

    return (
        <>
            <NativeBaseProvider>
                <ScrollView flex={1} background="#DBE4F3">
                    <Box
                        w={{
                            base: "90%",
                            md: "25%",
                        }}
                        alignSelf="center"
                        mt="7"
                    >
                        <FormControl isRequired>
                            <Stack mx="4">
                                <FormControl.Label>Badminton Union</FormControl.Label>
                                <Input type="text" isDisabled={true} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" defaultValue={props.currentUnion} />
                            </Stack>
                            <Stack mx="4" w="130" mt="5">
                                <FormControl isRequired isInvalid>
                                    <FormControl.Label>Choose Location</FormControl.Label>
                                    <Select
                                        minWidth="200"
                                        accessibilityLabel="Choose Location"
                                        placeholder="Choose Location"
                                        _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size={5} />,
                                        }}
                                        mt="1"
                                        fontWeight="bold"
                                        fontSize="18"
                                        color="#4D4D4D"
                                    >
                                        <Select.Item label="Agape" value="Agape" />
                                        <Select.Item label="PB Gotong Royong" value="PB Gotong Royong" />
                                        <Select.Item label="Paguyuban Tanah Seratus" value="Paguyuban Tanah Seratus" />
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Flex direction="row" alignSelf="center">
                                <Stack mx="1" w="118" mt="5">
                                    <FormControl.Label>Date</FormControl.Label>
                                    <Input type="text" isDisabled={true} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" defaultValue="YYYY-MM-DD" />
                                    <Box mt="3">
                                        <Button colorScheme="blue" onPress={showDatepicker}>
                                            <Heading color="white" size="md"> Set Date</Heading>
                                        </Button>
                                    </Box>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </Stack>
                                <Stack mx="1" mt="5">
                                    <FormControl.Label>From</FormControl.Label>
                                    <Input type="text" isDisabled={true} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" defaultValue="00:00" />
                                    <Box mt="3">
                                        <Button colorScheme="blue" onPress={showTimepicker}>
                                            <Heading color="white" size="md">Set Time</Heading>
                                        </Button>
                                    </Box>
                                </Stack>
                                <Stack mx="1" mt="5">
                                    <FormControl.Label>To</FormControl.Label>
                                    <Input type="text" isDisabled={true} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" defaultValue="00:00" />
                                    <Box mt="3">
                                        <Button colorScheme="blue" onPress={showTimepicker}>
                                            <Heading color="white" size="md">Set Time</Heading>
                                        </Button>
                                    </Box>
                                </Stack>
                            </Flex>
                            <Stack mx="1" mt="10">
                                <Button.Group
                                    colorScheme="blue"
                                    mx={{
                                        base: "auto",
                                        md: 0,
                                    }}
                                    
                                    
                                >
                                     <Button colorScheme="warning">
                                            <Heading color="white" size="lg">Save</Heading>
                                    </Button>
                                    <Button colorScheme="warning">
                                            <Heading color="white" size="lg">Cancel</Heading>
                                    </Button>
                                </Button.Group>
                            </Stack>
                        </FormControl>
                    </Box>
                </ScrollView>
            </NativeBaseProvider>
        </>
    );
};

const reduxState = (state) => ({
    currentUnion: state.currentUnion,
})

export default connect(reduxState, null)(Booking);

