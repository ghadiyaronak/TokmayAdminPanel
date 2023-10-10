import { FormControl, Text } from "@chakra-ui/react";

const SmallFormLabel = ({ title }: { title: string }) => {
    return (
        <Text flex={1} fontSize="sm" fontWeight={"bold"} display={"block"}>
            {title}
        </Text>
    );
};

export default SmallFormLabel;
