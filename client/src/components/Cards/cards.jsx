import React, { useRef, useState } from "react";
// import Button from "../Button/button";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import './cards.css';
import Dropdown from "../Dropdown/dropdown";
import { useOutsideClick } from "../../utils";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, IconButton, Image, Link, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import image from '../../retiro1.jpg';

const Cards = (props) => {

    return (
        <LinkBox as='article' textDecoration='none' m={2} _hover={{ boxShadow: '-3px 13px 31px -12px rgba(0, 0, 0, 0.22)' }}>
            <LinkOverlay href='#'>
                <Card minW={295} maxW={295} minH={500} maxH={500}>
                    <CardBody>
                        <Image src={image} alt='imagem divulgação' borderRadius={5} />
                        <Stack mt={6} spacing='3'>
                            <Heading size='md'>{props.title}</Heading>
                            <Text>Data: {props.data}</Text>
                            <Text>Local: {props.location}</Text>
                        </Stack>
                    </CardBody>
                </Card >
            </LinkOverlay>
        </LinkBox >
    );
};

export default Cards;