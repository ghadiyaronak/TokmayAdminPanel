import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { globalStyles } from "../../theme/styles";

interface ReturnButtonProps {
    link?: any;
}

const ReturnButton = ({ link }: ReturnButtonProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleReturn = () => {
        if (link) {
            navigate(link, { replace: true });
        } else {
            navigate(-1);
        }
    };

    return (
        <Button
            bgColor={globalStyles.colors.mainColor}
            _hover={{ bgColor: "blue.300" }}
            color={"white"}
            leftIcon={<ChevronLeftIcon />}
            onClick={handleReturn}
            cursor="pointer"
            size="md"
        >
            {t("common.return")}
        </Button>
    );
};

export default ReturnButton;
