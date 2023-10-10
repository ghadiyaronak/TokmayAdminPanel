// services & hooks
import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    Text,
    WrapItem,
    useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useHelperHook from "../../hooks/useHelperHook";
import ReturnButton from "../button/ReturnButton";
import useUserHook from "../../pages/protectedpages/Users/useUserHook";
import { globalStyles } from "../theme/styles";
import CustomStack from "./CustomStack";

const UserViewcard = () => {
    //hooks
    const [tableData, setTableData] = useState<any>([]);
    const { t } = useHelperHook();
    const [scrollTop, setScrollTop] = useState<boolean>(false);
    const { setUserData, updateUserStatus, setUpdateData, updateData, getIdByUser, setIsLoading, isLoading, setModal } =
        useUserHook();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // api call
    async function fetchData() {
        setIsLoading(true);
        try {
            const idByuserData = await getIdByUser();
            setUserData(idByuserData);
            setTableData(idByuserData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    // api call
    const handleUpdateStatus = async () => {
        setIsLoading(true);

        try {
            const updateData = await updateUserStatus(tableData?.userStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE");
            setUpdateData(updateData);
            setTableData(updateData);
            onClose();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        scrollTopFunction(), [scrollTop];
    }, [updateData]);

    const scrollTopFunction = () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "auto" });
        }, 100);
    };

    return (
        <>
            <Box mt={5} w={"4xl"} width={{ base: "full", md: "4xl" }}>
                <Card>
                    <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                        <Stack position={"absolute"} mx={5}>
                            <ReturnButton />
                        </Stack>
                        <CardHeader
                            p={0}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            alignContent={"center"}
                            width="full"
                        >
                            <Heading justifyContent={"center"} alignItems={"center"} alignContent={"center"} size="lg">
                                {t("user_mgmt.user_details")}
                            </Heading>
                        </CardHeader>
                    </Box>

                    <WrapItem
                        px={5}
                        display={"flex"}
                        // flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={5}
                    >
                        {/* <CustomCard /> */}
                        <Avatar
                            size="2xl"
                            borderRadius={"md"}
                            src={tableData?.profileImage?.url ?? "--"}
                            // name={userData?.user_name}
                        />
                    </WrapItem>
                    <CardBody>
                        <Divider />
                        <CustomStack data={tableData?._id ? tableData?._id : "--"} heading={"ID"} />
                        <CustomStack data={tableData?.nickName ?? "--"} heading={"ニックネーム"} />
                        <CustomStack
                            flex2={"0.8"}
                            flex={"0.2"}
                            data={tableData?.SelfIntroduction ?? "--"}
                            heading={"自己紹介"}
                        />
                        <CustomStack
                            flex2={"0.8"}
                            flex={"0.2"}
                            data={tableData?.MC累計回数 ?? "--"}
                            heading={"MC累計回数"}
                        />
                        <CustomStack
                            flex2={"0.8"}
                            flex={"0.2"}
                            data={tableData?.換金済みC ?? "--"}
                            heading={"換金済み C"}
                        />
                        <CustomStack
                            data={tableData?.dateOfBirth ? dayjs(tableData?.dateOfBirth).format("YYYY/MM") : "--"}
                            heading={"生年月"}
                        />
                        <CustomStack
                            data={tableData?.gender === "MALE" ? "男性" : "FEMALE" ? "女性" : "--"}
                            heading={"性別"}
                        />
                        <CustomStack data={tableData?.警告回数 ?? "--"} heading={"警告回数（3）"} />
                        <CustomStack data={tableData?.年代 ?? "--"} heading={"年代"} />
                        <CustomStack data={tableData?.友達紹介 ?? "--"} heading={"友達紹介"} />
                        <CustomStack data={tableData?.メールアドレス ?? "--"} heading={"メールアドレス"} />
                        <CustomStack data={tableData?.profession?.name ?? "--"} heading={"職業"} />
                        <CustomStack data={tableData?.contactNumber ?? "--"} heading={"携帯電話"} />
                        <CustomStack data={tableData?.coin ?? "--"} heading={"コイン"} />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {"ステータス"}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {/* {tableData?.userStatus ?? "--"} */}
                                    <Badge variant={tableData?.userStatus === "ACTIVE" ? "success" : "danger"}>
                                        {tableData?.userStatus === "ACTIVE" ? t("アクティブ") : t("ブロック")}
                                    </Badge>
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <CustomStack
                            data={
                                tableData?.lastLoginAt ? dayjs(tableData?.lastLoginAt).format("YYYY/MM/DD HH:mm") : "--"
                            }
                            heading={"最終ログイン"}
                        />
                    </CardBody>

                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} py={2}>
                        <Button
                            onClick={onOpen}
                            isLoading={isLoading}
                            bgColor={tableData?.userStatus === "ACTIVE" ? "red.400" : "#4299e1"}
                            _hover={{
                                bgColor: tableData?.userStatus === "ACTIVE" ? "red.300" : "blue.300"
                            }}
                            color={"white"}
                            w={"36"}
                        >
                            {tableData?.userStatus == "ACTIVE" ? t("status.block") : t("status.active")}
                        </Button>
                    </Box>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{t("common.user_status")}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box>
                                    <FormControl gap={10} display="flex" justifyContent={"center"} mt={5}>
                                        {tableData?.userStatus === "ACTIVE" ? (
                                            <Text>{t("form_errors.suspend_message")}</Text>
                                        ) : (
                                            <Text>{t("form_errors.active_message")}</Text>
                                        )}
                                    </FormControl>
                                </Box>
                            </ModalBody>
                            <ModalFooter>
                                <Box
                                    w={"full"}
                                    display="flex"
                                    justifyContent={"center"}
                                    onClick={() => setModal(false)}
                                >
                                    <Button
                                        bgColor={globalStyles.colors.mainColor}
                                        _hover={{ bgColor: "blue.300" }}
                                        isLoading={isLoading}
                                        onClick={() => {
                                            setScrollTop(true);
                                            handleUpdateStatus();
                                        }}
                                        color={"white"}
                                        mr={3}
                                    >
                                        {t("common.yes")}
                                    </Button>
                                    <Button
                                        bgColor={"red.500"}
                                        _hover={{ bgColor: "red.300" }}
                                        color={"white"}
                                        onClick={() => {
                                            setScrollTop(true);
                                            onClose();
                                        }}
                                    >
                                        {t("common.no")}
                                    </Button>
                                </Box>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Card>
            </Box>
        </>
    );
};

export default UserViewcard;
