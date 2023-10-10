import { Flex, Input, Text } from "@chakra-ui/react";
import SmallFormLabel from "./SmallFormLabel";

interface InputSelectProps {
    label: string;
    value: string;
    handleChange: any;
    name: string;
    type: string;
}

const InputSelect = ({ label, name, value, handleChange, type }: InputSelectProps) => {
    return (
        <Flex>
            <SmallFormLabel title={label} />
            <Input type={type} size={"sm"} h={7} w={"13rem"} value={value} onChange={handleChange} name={name} />
        </Flex>
    );
};

export default InputSelect;
