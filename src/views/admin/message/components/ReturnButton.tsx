import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Stack, Text, Icon, useColorModeValue, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ReturnStat = [
    {
        button: "Return"
    }
];
const ReturnButton = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const ButtonColor = useColorModeValue("#4299E1", "white");
    const TextColor = useColorModeValue("#000", "white");
    return (
        <Stack>
            {ReturnStat.map((statistics) => (
                <Flex
                    mt={5}
                    // bgColor={ButtonColor}
                    // borderRadius={20}
                    color={TextColor}
                    px={5}
                    py={2}
                    onClick={() => navigate("/message")}
                    _hover={{ cursor: "pointer" }}
                    align="center"
                    w="fit-content"
                    fontWeight={"bold"}
                >
                    <Icon as={FaChevronLeft} me="10px" h="13px" w="8px" />
                    <Text fontSize="sm">{t("common.return")}</Text>
                </Flex>
            ))}
        </Stack>
    );
};

export default ReturnButton;
