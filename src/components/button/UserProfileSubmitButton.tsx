import { Button } from "@chakra-ui/react";
import React from "react";
import { globalStyles } from "../theme/styles";

interface AddButtonProps {
    title: string;
    mode?: any;
    handleDisabled?: any;
    isLoading?: any;
}

const UserProfileSubmitButton = ({ title, mode, handleDisabled, isLoading }: AddButtonProps) => {
    return (
        <>
            <Button
                isDisabled={handleDisabled}
                type="submit"
                size="sm"
                w="40"
                borderRadius={"4"}
                color={"white"}
                py="5"
                fontWeight={"500"}
                transition={"0.3s all"}
                bg={globalStyles.colors.mainColor}
                _hover={{ bg: "#74b4e8" }}
                onClick={() => mode()}
                isLoading={isLoading}
            >
                {title}
            </Button>
        </>
    );
};

export default UserProfileSubmitButton;
