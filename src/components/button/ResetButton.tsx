import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface ResetButtonProps {
    isDisabled?: boolean;
    handleReset?: any;
}

const ResetButton = ({ isDisabled, handleReset }: ResetButtonProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Button
                colorScheme={"red"}
                color={"white"}
                size={"sm"}
                w={"30"}
                bgColor={"red.500"}
                rounded={"md"}
                type={"reset"}
                isDisabled={isDisabled}
                onClick={handleReset}
                _hover={{
                    bgColor: "red.500",
                    opacity: 0.8
                }}
            >
                {t("common.reset")}
            </Button>
        </>
    );
};

export default ResetButton;
