import { Flex, Spinner } from "@chakra-ui/react";

interface LoaderProps {
    height?: any;
}

const CustomLoader = ({ height }: LoaderProps) => {
    return (
        <Flex justifyContent={"center"} alignItems={"center"} w={"full"} h={!height ? "100vh" : height}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Flex>
    );
};

export default CustomLoader;
