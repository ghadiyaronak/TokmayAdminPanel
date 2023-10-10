import SmallFormLabel from "./SmallFormLabel";
import { Flex, Input } from "@chakra-ui/react";

interface SearchCustomeInputProps {
    label: string;
    value: string;
    handleChange: any;
    name: string;
    type: string;
}

const SearchCustomeInput = ({ label, name, value, handleChange, type }: SearchCustomeInputProps) => {
    return (
        <Flex>
            <SmallFormLabel title={label} />
            <Input type={type} size={"sm"} h={7} w={"13rem"} value={value} onChange={handleChange} name={name} />
        </Flex>
    );
};

export default SearchCustomeInput;
