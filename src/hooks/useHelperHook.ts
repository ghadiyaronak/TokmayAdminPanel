import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useHelperHook = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const toast = useToast();

    return { t, navigate, toast };
};

export default useHelperHook;
