import { Button } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const CancelButton = ({ handleClick }: { handleClick: any }) => {
    const { t } = useTranslation();

    return (
        <Button onClick={handleClick} variant="outline" colorScheme={"blackAlpha"} size={"sm"} rounded={"md"}>
            {t("common.cancel")}
        </Button>
    );
};

export default CancelButton;
