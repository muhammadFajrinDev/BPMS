import { Box, FormControl, Heading, Input, NativeBaseProvider, Stack } from "native-base"
import { getPBFull } from "../../../config/redux/action";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

const Profile = (props) => {

    const [union, setUnion] = useState({});
    useEffect(() => {
        props.getPBFull(props.currentUnion).then(res => {
            setUnion(res)
        }).catch(err => {
            alert(err)
        })
    }, [])

    return (
        <>
            <NativeBaseProvider>
                <Box flex={1} background="#DBE4F3">
                    <Heading textAlign="center" mt="10">
                        {union.name} Organizational Structure
                    </Heading>
                    <Stack mx="6" mt="7">
                        <FormControl.Label>Leader</FormControl.Label>
                        <Input type="text" isDisabled={true} background="#FFFFFF" defaultValue={union.Lead} color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" />
                    </Stack>
                    <Stack mx="6" mt="3">
                        <FormControl.Label>Deputy Lead</FormControl.Label>
                        <Input type="text" isDisabled={true} background="#FFFFFF" defaultValue={union.deputy_lead} color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" />
                    </Stack>
                    <Stack mx="6" mt="3">
                        <FormControl.Label>Mentor</FormControl.Label>
                        <Input type="text" isDisabled={true} background="#FFFFFF" defaultValue={union.mentor} color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" />
                    </Stack>
                    <Stack mx="6" mt="3">
                        <FormControl.Label>Secretary</FormControl.Label>
                        <Input type="text" isDisabled={true} background="#FFFFFF" defaultValue={union.secretary} color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" />
                    </Stack>
                    <Stack mx="6" mt="3">
                        <FormControl.Label>Administrator</FormControl.Label>
                        <Input type="text" isDisabled={true} background="#FFFFFF" defaultValue={union.admin} color="#4D4D4D" fontWeight="bold" variant="filled" size="xl" />
                    </Stack>
                </Box>
            </NativeBaseProvider>
        </>
    );
};

const reduxState = (state) => ({
    currentUnion: state.currentUnion,
})

const reduxDispatch = (dispatch) => ({
    getPBFull: (key) => dispatch(getPBFull(key)),
})

export default connect(reduxState, reduxDispatch)(Profile);

