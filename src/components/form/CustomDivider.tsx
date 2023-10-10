import { Box, Divider, Flex } from "@chakra-ui/react";
import React from "react";

const CustomDivider = () => {
    return (
        <Flex justifyContent={"center"}>
            <Divider borderColor={"#385368"} w={"90%"}></Divider>
        </Flex>
    );
};

export default CustomDivider;
