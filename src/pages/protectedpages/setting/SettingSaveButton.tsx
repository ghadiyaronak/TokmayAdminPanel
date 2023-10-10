import { Button } from "@chakra-ui/react";

interface SettingEditButtonProps {
    name: string;
    handleClick?: any;
    handleDisabled?: any;
}

const SettingSaveButton = ({ name, handleDisabled, handleClick }: SettingEditButtonProps) => {
    return (
        <Button bgColor={"gray"} onClick={handleClick} isDisabled={handleDisabled}>
            {name}
        </Button>
    );
};

export default SettingSaveButton;
