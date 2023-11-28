import React, { useEffect, useState } from "react";
import './formEvent.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearFormInput, createEvent } from "../redux/eventsAction";
import { useNavigate } from "react-router-dom";
import File64 from "../../../components/File64/file64";
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import GeneralForm from "./TabContents/GeneralForm";
import MapFrame from "./TabContents/mapFrame";
import AccommodationForm from "./TabContents/AccommodationForm";
import PaymentForm from "./TabContents/PaymentForm";

const FormEvent = (props) => {

    const event = useSelector((state) => state.eventState.event);
    const [cancelButton, setCancelButton] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createEvent(event));
    };

    useEffect(() => {
        if (cancelButton === true) {
            navigate(-1) || navigate('/');
        }
    }, [cancelButton]);

    const handleCancelClick = () => {
        dispatch(clearFormInput());
        setCancelButton(true);
    };

    return (
        <Flex flexDirection={'column'} gap='2' >
            <Box bg={'white'} w={'1100px'}>
                <Tabs orientation={props.screenSize >= 974 ? 'vertical' : 'horizontal'}>
                    <TabList>
                        <Tab>Dados Gerais</Tab>
                        <Tab>Acomodações</Tab>
                        <Tab>Pagamentos</Tab>
                        <Tab>Mapa</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <GeneralForm />
                        </TabPanel>
                        <TabPanel>
                            <AccommodationForm />
                        </TabPanel>
                        <TabPanel>
                            <PaymentForm />
                        </TabPanel>
                        <TabPanel>
                            <MapFrame />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex >
    );
};

export default FormEvent;