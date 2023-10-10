import { FormControl, Text } from "@chakra-ui/react";

const SmallFormLabel = ({ title }: { title: string }) => {
    return (
        <Text flex={1} fontWeight={"bold"} fontSize="sm" w={"2xs"} display={"block"}>
            {title}
        </Text>
    );
};

export default SmallFormLabel;
