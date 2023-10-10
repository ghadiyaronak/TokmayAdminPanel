import { Box, Button } from "@chakra-ui/react";
import { globalStyles } from "../theme/styles";

interface AddAdminProps {
    onOpen: any;
    title: string;
}
const AdminAddButton = ({ onOpen, title }: AddAdminProps) => {
    return (
        <Button
            variant={"solid"}
            bg={globalStyles.colors.mainColor}
            _hover={{
                bgColor: globalStyles.colors.mainColor
            }}
            color={"white"}
            onClick={onOpen}
        >
            {title}
        </Button>
    );
};
export default AdminAddButton;
