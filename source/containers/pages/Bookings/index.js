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
    const [totalHour, setTotalHour] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);

    // Validation
    const [dateValid, setDateValid] = useState(false);
    const [fromValid, setFromValid] = useState(true);
    const [toValid, setToValid] = useState(true);

    const onChange = (event, selectedDate) => {

        let today = new Date();
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
        setDateValid(false)
        setDateSave(moment(currentDate).format('YYYY-MM-DD'))
    };

    const handleFrom = (value) => {
        let result = condition.test(value);
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

    useEffect(() => {
        props.getLocation().then((res) => {
            setLocation(res)
        }).catch((err) => {
            alert(err)
        })

        Calculation(from,to)
    }, [from,to,totalHour,priceTotal])

    let Calculation = (from, to) => {
        let f = moment(from, "HH:mm");
        let t = moment(to, "HH:mm");

        let hours = Math.floor( t.diff(f, 'minute')/ 60);          
        let minutes = t.diff(f, 'minute') % 60;

        let combine = hours + '.' + minutes;

        setTotalHour(combine)
        setPriceTotal(Math.ceil(((20000 / 60 ) * ((60 * hours) + minutes))))
    }

    let validation = <Text mt="2" color="red.400">Invalid format time</Text>;
    
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

                                >
                                    {
                                        location.map((item, count) => {
                                            return (<Select.Item label={item.location} key={item.id + count} value={item.id} />)
                                        })
                                    }

                                </Select>
                            </FormControl>
                        </Stack>
                        <Flex direction="row" alignSelf="center">
                            <Stack mx="1" w="118" mt="5">
                                <FormControl.Label>Date</FormControl.Label>
                                <Input type="text" isInvalid={dateValid} isDisabled={true} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="md" defaultValue={dateSave} />
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
                            <Stack mx="1" mt="5">
                                <FormControl.Label>Total Hour</FormControl.Label>
                                <Input type="text" isDisabled={true} background="grey" color="#FFFFFF" fontWeight="bold" variant="filled" size="md" defaultValue={totalHour} />
                                {!toValid && (validation)}
                            </Stack>
                        </Flex>
                        <Stack mx="4" mt="5" w="50%">
                            <FormControl.Label>Price Calculation</FormControl.Label>
                            <Input type="number" textAlign="center" isDisabled={true} background="grey" color="#FFFFFF" fontWeight="bold" variant="filled" size="xl" defaultValue={priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                        </Stack>
                        <Stack mx="4" mt="5" >
                            <FormControl.Label>Requester</FormControl.Label>
                            <Input type="number" pl='4' isDisabled={false} background="#FFFFFF" color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" placeholder="username" defaultValue="" />
                        </Stack>
                        <Stack mx="1" mt="10" mb="8">
                            <Button.Group
                                colorScheme="blue"
                                mx={{
                                    base: "auto",
                                    md: 0,
                                }}
                            >
                                <Button colorScheme="warning" w="full" h="50px">
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

