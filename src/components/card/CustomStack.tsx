import { Divider, Flex, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
interface CustomStackProps {
    heading: string;
    data: any;
    flex?: any;
    flex2?: any;
}

const CustomStack = ({ heading, data, flex, flex2 }: CustomStackProps) => {
    return (
        <>
            <Stack divider={<StackDivider />} spacing="4">
                <Flex flex={!flex ? "" : flex}>
                    <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                        {heading}
                    </Heading>
                    <Text p={3} flex={!flex2 ? "" : flex2} fontSize="md">
                        {data}
                    </Text>
                </Flex>
            </Stack>
            <Divider />
        </>
    );
};

export default CustomStack;
