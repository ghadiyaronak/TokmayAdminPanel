import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Button, Stack, Box, Icon } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MASTER_ADMIN_NAV_ITEMS, INavItem } from "../../../../utils/types/SidebarCpnstant";
import { globalStyles } from "../../../../components/theme/styles";
import { FaBuromobelexperte, FaUserLock } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Accordian = ({ onClose }: { onClose: any }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const location = useLocation();

    return (
        <>
            <Accordion allowToggle color={"white"} defaultIndex={[0]}>
                <AccordionItem border={"0"}>
                    <h2>
                        <AccordionButton
                            px={"2.5"}
                            py={3}
                            bg={"white"}
                            color={"black"}
                            _hover={{ bg: globalStyles.colors.mainColor, color: "white" }}
                        >
                            <Box
                                as="span"
                                flex="1"
                                textAlign="left"
                                display={"flex"}
                                fontWeight={"bold"}
                                fontSize={"14"}
                            >
                                <Box>
                                    {/* <RiAdminFill style={{ marginRight: "8", display: "flex", alignItems: "center", fontSize : "18"}}/> */}
                                    {/* マスター管理者 */}
                                    <Icon as={FaUserLock} w={4} h={4} mr={2} />
                                </Box>
                                {"マスター管理者"}
                            </Box>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={2} px={"0"} borderBottom={"0"} background={"white"} py={"0"}>
                        <Stack direction="column" border={"none"}>
                            {MASTER_ADMIN_NAV_ITEMS.map((item: INavItem) => (
                                <Button
                                    bg={
                                        location.pathname.includes(item.label) ? globalStyles.colors.mainColor : "white"
                                    }
                                    onClick={() => {
                                        navigate(item.path);
                                        onClose();
                                    }}
                                    fontWeight={"bold"}
                                    color={location.pathname.includes(item.label) ? "white" : "black"}
                                    borderRadius={"0"}
                                    w={"full"}
                                    p={"0"}
                                    display={"flex"}
                                    justifyContent={"start"}
                                    px={2.5}
                                    py={3}
                                    gap={2}
                                    key={item.id}
                                    fontSize={"14"}
                                    _hover={{ bg: globalStyles.colors.mainColor, color: "white" }}
                                    _focus={{ bg: globalStyles.colors.mainColor, color: "white" }}
                                    mt={"0"}
                                >
                                    {/* <Icon as={MdOutlineAdminPanelSettings} w={4} h={4} mr={2} /> */}
                                    <item.icon />
                                    {t(`common.${item.label}`)}
                                </Button>
                            ))}
                        </Stack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default Accordian;
