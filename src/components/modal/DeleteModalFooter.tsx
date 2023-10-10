import { Button, ModalFooter } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../theme/styles";

interface ModalFooterProps {
    handleClose: any;
    isLoading: boolean;
    handleDelete: any;
}

const DeleteModalFooter = ({ handleClose, isLoading, handleDelete }: ModalFooterProps) => {
    const { t } = useTranslation();

    return (
        <ModalFooter>
            <Button
                rounded={"md"}
                bgColor={globalStyles.colors.button.danger}
                isLoading={isLoading}
                color={"#ffffff"}
                mr={3}
                onClick={handleDelete}
            >
                {t("common.delete")}
            </Button>
            <Button rounded={"md"} bgColor={"#A3A3A3"} color={"#ffffff"} onClick={handleClose}>
                {t("common.cancel")}
            </Button>
        </ModalFooter>
    );
};

export default DeleteModalFooter;
