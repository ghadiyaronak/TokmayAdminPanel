import {
    Badge,
    Flex,
    Stack,
    Tooltip,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Box,
    Text,
    FormControl,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { USER_STATUS } from "../Users/user.type";
import { endOfDay, startOfDay } from "date-fns";
import { globalStyles } from "../../../theme/styles";

//hooks
import useHelperHook from "../../../hooks/useHelperHook";
import useBlockUserHook from "./useBlockUserHook";

//components
import MainHeading from "../../../components/header/MainHeading";
import ReactDataTableComponent from "../../../components/table/ReactDataTable";
import TableHeading from "../../../components/table/TableHeading";
import UserTable from "../../../components/table/UserTable";
import DateSelect from "../../../components/customSelect/DateSelect";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import InputSelect from "../../../components/filters/InputSelect";
import MySelect from "../../../components/filters/MySelect";
import ExportExcel from "../../../components/button/Excelexport";
import CustomLoader from "../../../components/loader/CustomLoader";
import client from "../../../apiConfig/client";
import { AxiosError, isAxiosError } from "axios";
import UnBlockUser from "../../../components/modal/UnBlockUser";
import useUserHook from "../Users/useUserHook";

const BlockUsermgmt = () => {
    //hooks
    const { t, toast, navigate } = useHelperHook();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        blockuserData,
        setBlockUserData,
        getAllBlockUser,
        endDate,
        isLoading,
        setDisableReset,
        setEndDate,
        setIsLoading,
        setStartDate,
        setTableData,
        startDate,
        tableData
    } = useBlockUserHook();

    const { setUserData, updateUserStatus, setUpdateData, updateData, getIdByUser, updateBlockUserStatus, setModal } =
        useUserHook();

    const [scrollTop, setScrollTop] = useState<boolean>(false);
    const [userID, setUserID] = useState("");
    const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

    // data table
    const column = [
        {
            id: 1,
            name: <TableHeading heading={t("ユーザーネーム")} />,
            selector: (row: any) => row?.nickName,
            sortable: true,
            wrap: true,
            omit: false,
            width: "170px",
            cell: (row: any) => {
                return <UserTable column={row?.nickName ?? "--"} />;
            }
        },
        {
            id: 2,
            name: "ID",
            selector: (row: any) => row?._id,
            omit: false,
            width: "100px",
            cell: (row: any) => (
                <Flex alignItems={"center"}>
                    <Text as={"span"} cursor={"pointer"} color={globalStyles.colors.mainColor} fontWeight={"normal"}>
                        #{row._id && row._id?.substring(row._id.length - 5)}
                    </Text>
                </Flex>
            )
        },
        {
            id: 3,
            name: <TableHeading heading={t("個人情報")} />,
            selector: (row: any) => row?.SelfIntroduction,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => (
                <Tooltip label={row.SelfIntroduction}>
                    <Text fontWeight={"500"} noOfLines={1} cursor="pointer">
                        {row.SelfIntroduction ?? "--"}
                    </Text>
                </Tooltip>
            )
        },
        {
            id: 4,
            name: <TableHeading heading={t("保有ポイント")} />,
            selector: (row: any) => row?.keep_point,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.keep_point ?? "--"} />;
            }
        },
        {
            id: 5,
            name: <TableHeading heading={t("MC累計回数")} />,
            selector: (row: any) => row?.matchingTimes,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.matchingTimes ?? "--"} />;
            }
        },
        {
            id: 6,
            name: <TableHeading heading={t("換金済み C ")} />,
            selector: (row: any) => row?.convertedCoin,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.convertedCoin ?? "--"} />;
            }
        },
        {
            id: 7,
            name: <TableHeading heading={t("警告回数")} />,
            selector: (row: any) => row?.warnings,
            sortable: true,
            wrap: true,
            omit: false,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.warnings ?? "--"} />;
            }
        },
        {
            id: 8,
            name: <TableHeading heading={t("友達紹介")} />,
            selector: (row: any) => row?.Refer_a_friend,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.Refer_a_friend ?? "--"} />;
            }
        },
        {
            id: 9,
            name: <TableHeading heading={t("年代")} />,
            selector: (row: any) => row?.dateOfBirth, // Assuming 'dob' is the date of birth field from the backend
            sortable: true,
            wrap: true,
            omit: false,
            width: "100px",
            cell: (row: any) => {
                if (row?.dateOfBirth) {
                    const dob = new Date(row?.dateOfBirth); // Convert the date of birth string to a Date object
                    const currentDate = new Date(); // Get the current date

                    const yearsDiff = currentDate.getFullYear() - dob.getFullYear();
                    const monthsDiff = currentDate.getMonth() - dob.getMonth();

                    let ageString = `${yearsDiff}`;

                    if (monthsDiff < 0 || (monthsDiff === 0 && currentDate.getDate() < dob.getDate())) {
                        if (yearsDiff > 0) {
                            ageString = `${yearsDiff - 1} years ${12 + monthsDiff} months`;
                        } else {
                            ageString = `${monthsDiff} months`;
                        }
                    }

                    return <UserTable column={ageString} />;
                } else {
                    return <UserTable column={"--"} />;
                }
            }
        },
        {
            id: 10,
            name: <TableHeading heading={t("職業")} />,
            selector: (row: any) => row?.profession?.name,
            sortable: true,
            wrap: true,
            omit: false,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.profession?.name ?? "--"} />;
            }
        },
        {
            id: 12,
            name: <TableHeading heading={t("性別")} />,
            selector: (row: any) => row?.gender,
            sortable: true,
            wrap: true,
            omit: false,
            width: "100px",
            cell: (row: any) => {
                return <UserTable column={row?.gender ?? "--"} />;
            }
        },
        {
            id: 13,
            name: <TableHeading heading={t("電話番号")} />,
            selector: (row: any) => row?.contactNumber,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.contactNumber ?? "--"} />;
            }
        },
        {
            id: 14,
            name: <TableHeading heading={t("メールアドレス")} />,
            selector: (row: any) => row?.Male_adress,
            sortable: true,
            wrap: true,
            omit: false,
            width: "200px",
            cell: (row: any) => {
                return <UserTable column={row?.Male_adress ?? "--"} />;
            }
        },
        {
            id: 15,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.userStatus,
            sortable: true,
            wrap: true,
            width: "150px",
            omit: false,
            cell: (row: any) => (
                <Badge variant={row?.userStatus === "ACTIVE" ? "success" : "danger"}>
                    {row?.userStatus === "ACTIVE" ? t("アクティブ") : t("ブロック")}
                </Badge>
            )
        }
    ];

    const handleSearchData = () => {
        setDisableReset(false);
        handleFilteredData();
    };

    //api call
    async function fetchData() {
        setIsLoading(true);
        try {
            const blockuserData = await getAllBlockUser();
            setBlockUserData(blockuserData);
            setTableData(blockuserData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    // formik
    const { values, handleSubmit, setFieldValue, resetForm, setFieldTouched, dirty, handleChange } = useFormik({
        initialValues: {
            userName: "",
            userStatus: {
                label: "",
                value: ""
            },
            email: "",
            date: "",

            defaultStatus: ""
        },
        onSubmit: handleSearchData
    });

    const handleReset = () => {
        setTableData(blockuserData);
        resetForm();
        setStartDate(null);
        setEndDate(null);
    };

    const { isOpen: AddAdminIsOpen, onOpen: AddAdminOnOpen, onClose: AddAdminOnClose } = useDisclosure();

    const handleUpdateStatus = async () => {
        setIsUpdateLoading(true);

        try {
            const res = await updateBlockUserStatus(userID, tableData?.userStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE");
            console.log({ res });
            toast({
                title: res?.message,
                status: "success",
                duration: 3 * 1000,
                isClosable: true,
                position: "top-right"
            });
            fetchData();
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast({
                        title: error?.response?.data?.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                }
            }
        } finally {
            setIsUpdateLoading(false);
            AddAdminOnClose();
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

    // excel download
    const getExcelData = async () => {
        const arrayOfId = tableData.map((data: any) => data._id);
        try {
            const excelData = await client.post("/csv/user", { id: arrayOfId });
            const Excelexport: any[] = excelData.data?.data?.rows ?? [];

            toast({
                title: excelData?.data?.message,
                status: "success",
                duration: 3 * 1000,
                isClosable: true,
                position: "top-right"
            });
            return Excelexport;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    };

    // filters
    const handleFilteredData = () => {
        let filteredData = blockuserData.length > 0 ? [...blockuserData] : [];
        if (values.userName) {
            const lowerName = values.userName.trim().toLowerCase();
            filteredData = filteredData.filter((data: any) =>
                data?.nickName?.toString().toLowerCase().includes(lowerName)
            );
        }
        if (values.userStatus.value != "") {
            filteredData = filteredData.filter((data: any) => data?.userStatus.toString() === values.userStatus?.value);
        }

        if (!endDate && startDate) {
            filteredData = filteredData.filter((data: any) => {
                return startOfDay(new Date(data.createdAt)).getTime() >= startOfDay(new Date(startDate)).getTime();
            });
        }

        if (endDate && !startDate) {
            filteredData = filteredData.filter(
                (data: any) => endOfDay(new Date(endDate)) >= startOfDay(new Date(data.createdAt))
            );
        }

        if (endDate && startDate) {
            filteredData = filteredData.filter(
                (data: any) =>
                    startOfDay(new Date(startDate)) <= startOfDay(new Date(data.createdAt)) &&
                    endOfDay(new Date(endDate)) >= startOfDay(new Date(data.createdAt))
            );
        }
        setTableData(filteredData);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <>
            <Stack direction={"row"} mt={5} mb={1} alignItems={"center"} justifyContent={"space-between"}>
                <MainHeading title={t("ブロックユーザー")} />
            </Stack>

            <Box bgColor={"white"} p={4} rounded={"lg"} shadow={"sm"} my={3} mt={0}>
                <Text display={"flex"} fontWeight={"bold"} mb={3} alignItems={"center"}>
                    {t("common.search_condition")}
                </Text>

                <Flex gap={5} w={"full"} alignItems={"center"}>
                    <Flex flexDir={"column"} gap={3} w={"xs"}>
                        <InputSelect
                            label={"ニックネーム"}
                            value={values.userName}
                            handleChange={handleChange}
                            name={"userName"}
                            type="text"
                        />

                        <DateSelect
                            label={t("作成日")}
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            selected={startDate}
                            setFieldValue={setFieldValue}
                            name="date"
                        />
                        <Flex justifyContent={"space-between"} gap={3}>
                            <Text fontWeight={"bold"} fontSize="sm">
                                {t("common.status")}
                            </Text>
                            <MySelect
                                value={values.userStatus}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                options={USER_STATUS(t)}
                                name="userStatus"
                                multi={false}
                            />
                        </Flex>
                    </Flex>
                    <Box w={"0.5px"} h={"32"} bgColor={globalStyles.colors.mainColor} />
                    <Flex gap={2} mb={2} flexDir={"column"} ml={4}>
                        <Box w="36"></Box>
                        <ExportExcel getExcelData={getExcelData} fileName={"ユーザー"} />
                        <SearchButton isLoading={isLoading} handleSearchData={handleSubmit} />
                        <ResetButton isDisabled={!dirty} handleReset={handleReset} />
                    </Flex>
                </Flex>
            </Box>

            <Box rounded={"lg"} bgColor={"white"} px={5}>
                {isLoading ? (
                    <div>
                        <CustomLoader height={"50vh"} />
                    </div>
                ) : (
                    <ReactDataTableComponent
                        column={column}
                        data={tableData}
                        handleSubmit={(row: any) => {
                            setUserID(row?._id);
                            AddAdminOnOpen();
                        }}
                    />
                )}
            </Box>

            {/* <UnBlockUser /> */}
            <Modal isOpen={AddAdminIsOpen} onClose={AddAdminOnClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("ユーザーのブロック解除")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <FormControl gap={10} display="flex" justifyContent={"center"} mt={5}>
                                <Text>このユーザーをブロック解除してもよろしいですか</Text>
                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Box w={"full"} display="flex" justifyContent={"center"} onClick={() => setModal(false)}>
                            <Button
                                bgColor={globalStyles.colors.mainColor}
                                _hover={{ bgColor: "blue.300" }}
                                isLoading={isUpdateLoading}
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
                                    AddAdminOnClose();
                                }}
                            >
                                {t("common.no")}
                            </Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default BlockUsermgmt;
