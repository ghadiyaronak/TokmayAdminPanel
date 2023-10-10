import {
    Box,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Text,
    useDisclosure,
    useBreakpointValue
} from "@chakra-ui/react";
import AuthHeader from "../components/header/AuthHeader";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { globalStyles } from "../components/theme/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NAV_ITEMS } from "../utils/types/SidebarCpnstant";
import Accordian from "../pages/protectedpages/manger/components/Accordian";
import { AiFillDashboard } from "react-icons/ai";
import { ImUser } from "react-icons/im";
import { useAppSelector } from "../store/hooks";
import { selectCurrentToken } from "../store/slices/authSlice";

interface NavItemProps {
    path: string;
    icon: any;
    label: string;
    setProgress: any;
    onClose: any;
}

const NavItem = ({ path, icon, label, setProgress, onClose }: NavItemProps) => {
    const currentTab = window.location.pathname;
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Flex
            align="center"
            px={"2.5"}
            py={"3"}
            role="group"
            fontWeight="bold"
            transition=".25s all linear"
            bgColor={currentTab?.includes(path) ? globalStyles.colors.mainColor : ""}
            color={currentTab?.includes(path) ? "white" : ""}
            onClick={() => {
                navigate(path);
                setProgress(100);
                onClose();
            }}
            cursor="pointer"
        >
            {/* { <Icon boxSize="4" as={icon}  />} */}
            {icon && icon(currentTab?.includes(path) ? "white" : "black")}

            <Flex w={"full"} alignItems={"center"} gap={2}>
                <Text ml={2} fontSize={"sm"} color={currentTab?.includes(path) ? "white" : "black"}>
                    {t(label)}
                </Text>
            </Flex>
        </Flex>
    );
};

const SidebarContent = ({ setExpandSideBar, expandSideBar, setProgress, negotioanData, ...props }: any) => {
    const { t } = useTranslation();
    const adminProfile = useSelector((state: any) => state?.MasterProfile);
    return (
        <Box
            as="nav"
            pos="fixed"
            h="-webkit-fill-available"
            left="0"
            zIndex="sticky"
            bg={"white"}
            borderRightWidth="1px"
            transition=".20s all linear"
            w={expandSideBar ? "40" : "12"}
            {...props}
        >
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                aria-label="Main Navigation"
                justifyContent="space-between"
                // h="full"
            >
                <Box>
                    {/* NAV_ITEMS */}
                    <NavItem
                        key={1}
                        icon={AiFillDashboard}
                        path={"/dashboard"}
                        label={"home"}
                        setProgress={setProgress}
                        onClose={props.onClose}
                    />
                    <NavItem
                        key={2}
                        icon={ImUser}
                        path={"/users"}
                        label={"ユーザー"}
                        setProgress={setProgress}
                        onClose={props.onClose}
                    />
                    <Accordian onClose={props.onClose} />
                    {NAV_ITEMS.map((nav: any) => {
                        return (
                            <NavItem
                                key={nav.id}
                                icon={nav.icon}
                                path={nav.path}
                                label={nav.label}
                                setProgress={setProgress}
                                onClose={props.onClose}
                            />
                        );
                    })}
                </Box>
            </Flex>
        </Box>
    );
};

const ProtectedLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const [expandSideBar, setExpandSideBar] = useState(true);

    const [progress, setProgress] = useState(0);
    const token = useAppSelector(selectCurrentToken);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <Box pos={"relative"}>
            <LoadingBar
                color={globalStyles.colors.mainColor}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={3}
            />
            <AuthHeader open={onOpen} />
            <Box mt={12}>
                <Box>
                    {/* sidebar which will be seen after lg breakpoint */}
                    <SidebarContent
                        display={{
                            base: "none",
                            lg: "unset"
                        }}
                        setExpandSideBar={setExpandSideBar}
                        expandSideBar={expandSideBar}
                        onClose={onClose}
                        setProgress={setProgress}
                    />
                    {/* drawer for sm and md screen */}
                    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <SidebarContent
                                w="full"
                                borderRight="none"
                                onClose={onClose}
                                display={{ base: "inline-block", lg: "none" }}
                                setProgress={setProgress}
                            />
                        </DrawerContent>
                    </Drawer>
                    <Box
                        ml={useBreakpointValue({
                            base: "0",
                            lg: expandSideBar ? "40" : "12"
                        })}
                        transition=".20s all linear"
                        px={"4"}
                        h={"95vh"}
                        bg={"#f4f7fe"}
                        overflowY={"scroll"}
                        pb={10}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>
            <Box
                ml={useBreakpointValue({ base: "0", lg: expandSideBar ? "40" : "12" })}
                transition=".20s all linear"
                position={"absolute"}
                width={"full"}
                bottom={0}
            >
                {/* <Footer /> */}
            </Box>
        </Box>
    );
};

export default ProtectedLayout;
