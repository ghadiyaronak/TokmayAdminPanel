import { Button, ModalFooter } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../theme/styles";

interface ModalFooterProps {
    handleClose: any;
    isLoading?: boolean;
    handleDisabled?: any;
}

const ModalFooterComponent = ({ handleClose, isLoading, handleDisabled }: ModalFooterProps) => {
    const { t } = useTranslation();
    return (
        <ModalFooter>
            <Button
                rounded={"md"}
                bgColor={globalStyles.colors.button.success}
                isLoading={isLoading}
                color={"#ffffff"}
                mr={3}
                onClick={handleClose}
                isDisabled={handleDisabled}
                type="submit"
                _hover={{ bg: globalStyles.colors.button.success }}
            >
                {t("common.save")}
            </Button>
            <Button rounded={"md"} bgColor={"#A3A3A3"} color={"#ffffff"} onClick={handleClose}>
                {t("common.cancel")}
            </Button>
        </ModalFooter>
    );
};

export default ModalFooterComponent;
