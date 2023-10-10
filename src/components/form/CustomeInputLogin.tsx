import { Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { globalStyles } from "../theme/styles";
interface InputsProp {
    placehold?: any;
    Type?: any;
    name?: any;
    values?: any;
    handleChange?: any;
    handleBlur?: any;
    errors?: any;
    touched?: any;
    label?: any;
    isMandatory: boolean;
    min?: string;
}

const CustomInputField = ({
    placehold,
    Type,
    name,
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    label,
    isMandatory,
    min
}: InputsProp) => {
    return (
        <Flex flexDir={"column"} flex={0.5}>
            <FormLabel>
                {label}
                {isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </FormLabel>
            <Input
                _focus={{ borderColor: globalStyles.colors.mainColor }}
                border={"1px solid #D6D6D6"}
                type={Type}
                name={name}
                placeholder={placehold}
                _placeholder={{ color: "gray" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values}
                // min={min ?? new Date().toISOString().split("T")[0]}
                isInvalid={errors && touched}
                errorBorderColor="red.300"
            />
            {errors && touched && (
                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                    {errors}
                </Text>
            )}
        </Flex>
    );
};

export default CustomInputField;
