import React from "react";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";

// Icon
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { globalStyles } from "../theme/styles";

interface InputFieldProps {
    label: string;
    name: string;
    value?: string;
    handleChange: any;
    handleBlur: any;
    errors: any;
    touched: any;
    isMandatory: boolean;
}

const CustomPasswordField: React.FC<InputFieldProps> = (props) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <FormControl>
            <FormLabel>
                {props.label}
                {props.isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </FormLabel>
            <InputGroup size="md">
                <Input
                    name={props.name}
                    _focus={{ borderColor: globalStyles.colors.mainColor }}
                    type={show ? "text" : "password"}
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    isInvalid={props.errors && props.touched}
                    errorBorderColor="red.300"
                />
                <InputRightElement width="4.5rem">
                    {show ? (
                        <Box onClick={handleClick} cursor={"pointer"}>
                            <AiFillEye size={"22"} />
                        </Box>
                    ) : (
                        <Box onClick={handleClick} cursor={"pointer"}>
                            <AiFillEyeInvisible size={"22"} />
                        </Box>
                    )}
                </InputRightElement>
            </InputGroup>

            {props.errors && props.touched && (
                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                    {props.errors}
                </Text>
            )}
        </FormControl>
    );
};

export default CustomPasswordField;
