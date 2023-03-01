import React, { useRef, useState } from "react";
// import Button from "../Button/button";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import './cards.css';
import Dropdown from "../Dropdown/dropdown";
import { useOutsideClick } from "../../utils";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import image from '../../retiro1.jpg';

const Cards = (props) => {

    const [isActive, setIsActive] = useState(false);
    const ref = useRef();

    useOutsideClick(ref, () => setIsActive(false));

    const handleOptionDropdown = (e) => {
        e.stopPropagation(); //this prevent father div oclick action is execute when click on optionBtn
        setIsActive(!isActive);
    };

    return (
        <Card m={2} minW={295} maxW={295} minH={550} maxH={550}>
            <CardBody>
                <Image src={image} alt='imagem divulgação' borderRadius={5} />
                <Stack mt={6} spacing='3'>
                    <Heading size='md'>{props.title}</Heading>
                    <Text>Data: {props.data}</Text>
                    <Text>Local: {props.location}</Text>
                </Stack>
            </CardBody>
            <Divider w='92%' marginLeft={3} opacity='0.5' />
            <CardFooter justify={'center'}>
                <ButtonGroup spacing='4'>
                    <Button variant='solid' colorScheme='blue'>
                        Inscrição
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Detalhes
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card >
    );
};

export default Cards;



{/* <div className="cardBox" key={props.key && props.key} onClick={props.clickCard}>
            {props.image ?
                <div className="cardImg" style={{
                    backgroundImage: `url(${props.image})`,
                }}></div>
                : null}
            <div className="cardInfo">
                <h2>{props.title}</h2>
                <p>Data: {props.data}</p>
                <p>Inscrição: {props.inscricaoDate}</p>
                <p>Local: {props.location}</p>
            </div>
            {
                props.cardOption === true ?
                    <div className="cardOption">
                        <Button
                            name="option"
                            className='optionBtn'
                            icon={<BiDotsVerticalRounded size={"2em"} />}
                            onClick={(e) => handleOptionDropdown(e)}
                        />
                    </div>
                    : null
            }
            {
                isActive &&
                <Dropdown
                    ref={ref}
                    type={'cardDropdown'}
                    action={props.actions}
                />
            }
        </div> */}



/*  <Card m={2} minW={295} maxW={295} minH={550} maxH={550}>
     <Box position={'absolute'} right={0} >
         <IconButton
             variant='ghost'
             colorScheme='gray'
             aria-label='options'
             icon={<BiDotsVerticalRounded size={"1.5em"} />}
         />
     </Box>
     <CardBody>
         <Image src={image} alt='imagem divulgação' borderRadius={5} />
         <Stack mt={6} spacing='3'>
             <Heading size='md'>{props.title}</Heading>
             <Text>Data: {props.data}</Text>
             <Text>Local: {props.location}</Text>
         </Stack>
     </CardBody>
     <Divider w='92%' marginLeft={3} opacity='0.5' />
     <CardFooter justify={'center'}>
         <ButtonGroup spacing='4'>
             <Button variant='solid' colorScheme='blue'>
                 Inscrição
             </Button>
             <Button variant='ghost' colorScheme='blue'>
                 Detalhes
             </Button>
         </ButtonGroup>
     </CardFooter>
 </Card > */