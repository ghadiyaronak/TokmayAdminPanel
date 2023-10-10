import { Button } from "@chakra-ui/react";
import { globalStyles } from "../theme/styles";
import { useTranslation } from "react-i18next";
interface ButtonProp {
    label: any;
    isSubmitting?: any;
}

const LoginButton = ({ label, isSubmitting }: ButtonProp) => {
    const { t } = useTranslation();
    return (
        <Button
            bgColor={globalStyles.colors.mainColor}
            type={"submit"}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            color="white"
            width={"full"}
            borderRadius={"2xl"}
            fontWeight={"black"}
        >
            {t(label)}
        </Button>
    );
};

export default LoginButton;
