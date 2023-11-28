import { Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React from 'react';
import './input.css';

const CustomInput = (props) => {
    console.log(props.errorMessage);
    return (
        <Box p={5}>
            <FormControl
                variant="floating"
                id={props.id}
                isRequired={props.required ? true : false}
                isInvalid={props.invalid === false ? false : true}
            >
                {
                    props.type === 'textarea' ?
                        <Textarea
                            placeholder=" "
                            name={props.name}
                            onChange={props.onChange}
                            value={props.value}
                        />
                        :
                        <Input
                            id={props.id}
                            placeholder=" "
                            name={props.name}
                            onChange={props.onChange}
                            value={props.value}
                            type={props.type}
                        />
                }
                <FormLabel>{props.label}</FormLabel>
                {props.textHelp ? <FormHelperText>{props.textHelp}</FormHelperText> : ''}
                <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
            </FormControl>
        </Box>
    );
};

export default CustomInput;