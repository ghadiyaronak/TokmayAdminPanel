import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { globalStyles } from "../theme/styles";

interface AddButtonProps {
    handleClick?: any;
    top?: number;
    right?: number;
}

const EditArrowButton = ({ handleClick, right, top }: AddButtonProps) => {
    return (
        <Flex justifyContent={"flex-end"}>
            <Box
                onClick={handleClick}
                position={"absolute"}
                top={top ?? "-2"}
                cursor={"pointer"}
                right={right ?? "-3"}
                w="10"
                h="10"
                bg={"none"}
                color={globalStyles.colors.mainColor}
                _hover={{ bg: globalStyles.colors.mainColor, color: "white" }}
                transition={"0.3s all"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderTopRightRadius={"lg"}
            >
                <BiEdit fontSize={"22"} />
            </Box>
        </Flex>
    );
};

export default EditArrowButton;
