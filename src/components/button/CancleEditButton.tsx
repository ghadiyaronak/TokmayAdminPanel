import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { ImCancelCircle } from "react-icons/im";

interface AddButtonProps {
    title: string;
    mode?: any;
    setMode: any;
}

const CancelEditButton = ({ title, mode, setMode }: AddButtonProps) => {
    return (
        <Flex justifyContent={"flex-end"}>
            <Box
                onClick={() => {
                    setMode(!mode);
                }}
                position={"absolute"}
                top={"0"}
                cursor={"pointer"}
                right={"0"}
                w="10"
                h="10"
                bg={"none"}
                color={"#ee5d50"}
                _hover={{ bg: "red", color: "white" }}
                transition={"0.3s all"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderTopRightRadius={"lg"}
            >
                <ImCancelCircle fontSize={"20"} />
            </Box>
        </Flex>
    );
};

export default CancelEditButton;
