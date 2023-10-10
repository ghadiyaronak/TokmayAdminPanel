import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../theme/styles";

interface SearchButtonProps {
    handleSearchData?: any;
    isLoading?: boolean;
}

const SearchButton = ({ handleSearchData, isLoading }: SearchButtonProps) => {
    const { t } = useTranslation();
    return (
        <Button
            bgColor={globalStyles.colors.mainColor}
            color={"white"}
            size={"sm"}
            rounded={"md"}
            w={"30"}
            type="submit"
            onClick={handleSearchData}
            isLoading={isLoading}
            _hover={{
                bgColor: globalStyles.colors.mainColor,
                opacity: 0.8
            }}
        >
            {t("common.search")}
        </Button>
    );
};

export default SearchButton;
