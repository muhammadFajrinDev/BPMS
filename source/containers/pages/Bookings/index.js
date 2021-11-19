import { Box, Button, FormControl, Heading, Input, NativeBaseProvider, Stack, ScrollView, Flex, Select, CheckIcon, Text } from "native-base"
import DateTimePicker from '@react-native-community/datetimepicker';
import { getLocation } from "../../../config/redux/action";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Alert } from "react-native";
import moment from 'moment';

const Booking = (props) => {

    const condition = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$', 'g');

    // Date input Attr
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // get Data
    const [dateSave, setDateSave] = useState('YYYY-MM-DD');
    const [location, setLocation] = useState([{ location: '', member_price: '', price_perhour: '' }]);
    const [HandleReq, setHandleReq] = useState('');
    // const [totalHour, setTotalHour] = useState(0);
    // const [priceTotal, setPriceTotal] = useState(0);
    const [locationSelect, setLocationSelect] = useState('');
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);

    // Validation
    const [reqLocValid, setReqLocValid] = useState(true);
    const [dateValid, setDateValid] = useState(true);
    const [fromValid, setFromValid] = useState(true);
    const [reqValid, reqSetValid] = useState(true);
    const [toValid, setToValid] = useState(true);

    const onChange = (event, selectedDate) => {

        let today = new Date();
        // set hour 00:00
        today.setHours(0, 0, 0, 0);

        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');

        if (currentDate < today) {
            setDateValid(true)
            return Alert.alert(
                "Infomation",
                "Sorry for date cannot less from date today",
            )
        }
        setDateValid(true)
        setDateSave(moment(currentDate).format('YYYY-MM-DD'))
    };

    const handleFrom = (value) => {
        let result = condition.test(value);
        console.log("tes", result)
        setFromValid(result)
        setFrom(value)
    }
    const handleTo = (value) => {
        let result = condition.test(value);
        setToValid(result)
        setTo(value)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const saveDataBooking = () => {

        let validArr = []

        if (dateSave == 'YYYY-MM-DD') {
            setDateValid(false)
            validArr.push(false)
        }

        if (from == 0 || !fromValid) {
            setFromValid(false)
            validArr.push(false)
        }

        if (to == 0 || !toValid) {
            setToValid(false)
            validArr.push(false)
        }

        if (HandleReq == 0) {
            reqSetValid(false)
            validArr.push(false)
        }

        if (locationSelect == '') {
            setReqLocValid(false)
            validArr.push(false)
        }

        if (from > to) {
            setFromValid(false)
            setToValid(false)
            validArr.push(false)
            Alert.alert(
                "Infomation",
                "Sorry for start time cannot more than end time.",
            )
        }

        if (FormOK(validArr)) {
            Alert.alert(
                "Confirmation",
                "Are you sure ?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    const FormOK = (validArr) => {
        console.log(validArr)
        if (validArr.includes(false)) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {

        const getLocation = async () => {
            let Locs = await props.getLocation();
            setLocation(Locs)
        }

        // Calculation(from,to)
        getLocation()
    }, [from, to])

    // let Calculation = (from, to) => {
    //     let f = moment(from, "HH:mm");
    //     let t = moment(to, "HH:mm");

    //     let hours = Math.floor( t.diff(f, 'minute')/ 60);          
    //     let minutes = t.diff(f, 'minute') % 60;

    //     let combine = hours + '.' + minutes;

    //     setTotalHour(combine)
    //     setPriceTotal(Math.ceil(((20000 / 60 ) * ((60 * hours) + minutes))))
    // }

    let validation = <Text mt="2" color="red.400">Invalid format</Text>;

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
                                <FormControl isRequired >
                                    <FormControl.Label>Choose Location</FormControl.Label>
                                    <Select
                                        minWidth="320"
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
                                        borderWidth="1"
                                        borderColor="grey"
                                        onValueChange={(itemValue) => {
                                            setLocationSelect(itemValue)
                                            setReqLocValid(true)
                                        }}
                                        isInvalid={!reqLocValid}
                                    >
                                        {
                                            location.map((item, count) => {
                                                return (<Select.Item label={item.location} key={item.id + count} value={item.id} />)
                                            })
                                        }

                                    </Select>
                                    {!reqLocValid && (validation)}
                                </FormControl>
                            </Stack>
                            <Flex direction="row" ml="4">
                                <Stack mx="1" w="118" mt="5">
                                    <FormControl.Label>Date</FormControl.Label>
                                    <Input type="text" isInvalid={!dateValid} isDisabled={true} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="md" defaultValue={dateSave} />
                                    {!dateValid && (validation)}
                                    <Box mt="3">
                                        <Button colorScheme="blue" onPress={showDatepicker}>
                                            <Heading color="white" size="sm"> Set Date</Heading>
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
                                <Stack mx="2" mt="5">
                                    <FormControl.Label>From</FormControl.Label>
                                    <Input type="text" isInvalid={!fromValid} onChangeText={text => handleFrom(text)} isDisabled={false} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="md" defaultValue="00:00" />
                                    {!fromValid && (validation)}

                                </Stack>
                                <Stack mx="2" mt="5">
                                    <FormControl.Label>To</FormControl.Label>
                                    <Input type="text" isDisabled={false} onChangeText={text => handleTo(text)} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="md" defaultValue="00:00" />
                                    {!toValid && (validation)}
                                </Stack>
                            </Flex>
                            <Stack mx="4" mt="5" >
                                <FormControl.Label>Requester</FormControl.Label>
                                <Input type="number" pl='4' isInvalid={!reqValid} onChangeText={text => {
                                    setHandleReq(text)
                                    reqSetValid(true)
                                }
                                } isDisabled={false} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" placeholder="username" defaultValue="" />
                                {!reqValid && (validation)}
                            </Stack>
                            <Stack mx="1" mt="10" mb="8">
                                <Button.Group
                                    colorScheme="blue"
                                    mx={{
                                        base: "auto",
                                        md: 0,
                                    }}
                                >
                                    <Button onPress={() => saveDataBooking()} colorScheme="warning" w="full" h="50px">
                                        <Heading color="white" size="lg">Save</Heading>
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


const reduxDispatch = (dispatch) => ({
    getLocation: () => dispatch(getLocation()),
})

export default connect(reduxState, reduxDispatch)(Booking);

