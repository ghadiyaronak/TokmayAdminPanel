//hooks & services
import useUserHook from "./useUserHook";
import useHelperHook from "../../../hooks/useHelperHook";
import { Avatar, Badge, Box, Flex, Stack, Text, Tooltip, WrapItem } from "@chakra-ui/react";
import { globalStyles } from "../../../components/theme/styles";
import { useEffect } from "react";
import { USER_GENDER, USER_STATUS } from "./user.type";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import dayjs from "dayjs";
import client from "../../../apiConfig/client";

//components
import MainHeading from "../../../components/header/MainHeading";
import ReactDataTableComponent from "../../../components/table/ReactDataTable";
import TableHeading from "../../../components/table/TableHeading";
import UserTable from "../../../components/table/UserTable";
import InputSelect from "../../../components/filters/InputSelect";
import MySelect from "../../../components/filters/MySelect";
import SmallFormLabel from "../../../components/filters/SmallFormLabel";
import ExportExcel from "../../../components/button/Excelexport";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import CustomLoader from "../../../components/loader/CustomLoader";

const UserList = () => {
    //hooks
    const { t, navigate, toast } = useHelperHook();
    const {
        getAllUser,
        setUserData,
        userData,
        isLoading,
        disableReset,
        setDisableReset,
        setIsLoading,
        setTableData,
        tableData
    } = useUserHook();

    const handleSearchData = () => {
        setDisableReset(false);
        handleFilteredData();
    };

    //api call
    async function fetchData() {
        setIsLoading(true);
        try {
            const userData = await getAllUser();
            setUserData(userData);
            setTableData(userData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    function handleClick(row: any) {
        navigate(`/users/details/${row?._id}`);
    }

    const { values, handleSubmit, touched, setFieldValue, resetForm, setFieldTouched, dirty, handleChange } = useFormik(
        {
            initialValues: {
                nickName: "",
                userStatus: {
                    label: "",
                    value: ""
                },
                userRole: {
                    label: "",
                    value: ""
                },
                gender: {
                    label: "",
                    value: ""
                },
                contactNumber: ""
            },
            onSubmit: handleSearchData
        }
    );

    // fillters
    const handleFilteredData = () => {
        let filterData = userData.length > 0 ? [...userData] : [];

        if (values.nickName) {
            const lowerName = values.nickName.trim().toLowerCase();
            filterData = filterData.filter((data: any) => data?.nickName?.toString().toLowerCase().includes(lowerName));
        }

        if (values.contactNumber) {
            if (values.contactNumber) {
                const lowerName = values.contactNumber.trim().toLowerCase();
                filterData = filterData.filter((data: any) =>
                    data?.contactNumber?.toString().toLowerCase().includes(lowerName)
                );
            }
        }

        if (values.userStatus.value != "") {
            filterData = filterData.filter((data: any) => data?.userStatus.toString() == values.userStatus?.value);
        }

        if (values.gender.value != "") {
            if (values.gender.value != "") {
                const lowerName = values.gender.value.trim().toLowerCase();
                filterData = filterData.filter((data: any) => data?.gender?.toString().toLowerCase() === lowerName);
            }
        }

        if (values.userRole.value != "") {
            if (values.userRole.value != "") {
                const lowerName = values.userRole.value.trim().toLowerCase();
                filterData = filterData.filter((data: any) =>
                    data?.userRole?.toString().toLowerCase().includes(lowerName)
                );
            }
        }

        setTableData(filterData);
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

    // data table
    const column = [
        {
            id: 1,
            name: <TableHeading heading={t("ニックネーム")} />,
            selector: (row: any) => row?.nickName,
            sortable: true,
            wrap: true,
            cell: (row: any) => {
                return (
                    <Flex alignItems={"center"} onClick={() => navigate(`/users/details/${row?._id}`, { state: row })}>
                        <WrapItem pr={2}>
                            <Avatar size={"sm"} src={row?.profileImage?.url} />
                        </WrapItem>
                        <Text
                            color={globalStyles.colors.mainColor}
                            fontWeight={"normal"}
                            textTransform={"uppercase"}
                            cursor={"pointer"}
                        >
                            {row.nickName ?? "--"}
                        </Text>
                    </Flex>
                );
            },
            width: "180px"
        },
        {
            id: 2,
            name: "ID",
            selector: (row: any) => row?._id,
            omit: false,
            width: "100px",
            cell: (row: any) => (
                <Flex alignItems={"center"} onClick={() => navigate(`/users/details/${row?._id}`, { state: row })}>
                    <Text as={"span"} cursor={"pointer"} color={globalStyles.colors.mainColor} fontWeight={"normal"}>
                        #{row._id && row._id?.substring(row._id.length - 5)}
                    </Text>
                </Flex>
            )
        },
        {
            id: 3,
            name: <TableHeading heading={t("コイン")} />,
            selector: (row: any) => row?.coin,
            sortable: true,
            wrap: true,
            omit: false,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.coin ?? "--"} />;
            }
        },
        {
            id: 4,
            name: <TableHeading heading={t("MC累計回数")} />,
            selector: (row: any) => row?.MC累計回数,
            sortable: false,
            wrap: true,
            omit: false,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.MC累計回数 ?? "--"} />;
            }
        },
        {
            id: 5,
            name: <TableHeading heading={t("換金済み C")} />,
            selector: (row: any) => row?.換金済みC,
            sortable: false,
            wrap: true,
            omit: false,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.換金済みC ?? "--"} />;
            }
        },
        {
            id: 10,
            name: <TableHeading heading={t("携帯電話")} />,
            selector: (row: any) => row?.contactNumber,
            sortable: false,
            wrap: true,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.contactNumber} />;
            }
        },
        {
            id: 6,
            name: <TableHeading heading={t("警告回数（3）")} />,
            selector: (row: any) => row?.警告回数,
            sortable: false,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.警告回数 ?? "--"} />;
            }
        },
        {
            id: 7,
            name: <TableHeading heading={t("友達紹介")} />,
            selector: (row: any) => row?.友達紹介,
            sortable: false,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.友達紹介 ?? "--"} />;
            }
        },
        {
            id: 11,
            name: <TableHeading heading={t("自己紹介")} />,
            selector: (row: any) => row.SelfIntroduction,
            sortable: true,
            omit: false,
            grow: 2,
            width: "150px",
            cell: (row: any) => (
                <Tooltip label={row.SelfIntroduction}>
                    <Text fontWeight={"500"} noOfLines={1} cursor="pointer">
                        {row.SelfIntroduction ?? "--"}
                    </Text>
                </Tooltip>
            )
        },
        {
            id: 8,
            name: <TableHeading heading={t("年代")} />,
            selector: (row: any) => row?.年代,
            sortable: false,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.年代 ?? "--"} />;
            }
        },
        {
            id: 9,
            name: <TableHeading heading={t("メールアドレス")} />,
            selector: (row: any) => row?.メールアドレス,
            sortable: false,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.メールアドレス ?? "--"} />;
            }
        },

        {
            id: 12,
            name: <TableHeading heading={t("生年月")} />,
            selector: (row: any) => row?.dateOfBirth,
            sortable: true,
            wrap: true,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.dateOfBirth ? dayjs(row?.dateOfBirth).format("YYYY/MM") : "--"} />;
            }
        },
        {
            id: 13,
            name: <TableHeading heading={t("職業")} />,
            selector: (row: any) => row?.profession?.name,
            sortable: false,
            wrap: true,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.profession?.name ?? "--"} />;
            }
        },
        {
            id: 14,
            name: <TableHeading heading={t("性別")} />,
            selector: (row: any) => (
                <Text flexWrap={"wrap"}>{row?.gender === "MALE" ? "男性" : "FEMALE" ? "女性" : "--"}</Text>
            ),
            sortable: true,
            wrap: true,
            width: "100px"
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

    useEffect(() => {
        fetchData();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const handleReset = () => {
        fetchData();
        setUserData(userData);
        resetForm();
    };

    return (
        <Box>
            <Stack direction={"row"} mt={5} mb={1} alignItems={"center"} justifyContent={"space-between"}>
                <MainHeading title={t("ユーザー管理画面")} />
            </Stack>

            <>
                <Box bgColor={"white"} p={4} rounded={"lg"} shadow={"sm"} my={3} mt={0}>
                    <Text display={"flex"} fontWeight={"bold"} mb={3} alignItems={"center"}>
                        {t("common.search_condition")}
                    </Text>

                    <Flex gap={5} w={"full"} alignItems={"center"}>
                        <Flex flexDir={"column"} gap={3} w={"xs"}>
                            <InputSelect
                                label={"ニックネーム"}
                                value={values.nickName}
                                handleChange={handleChange}
                                name={"nickName"}
                                type="text"
                            />

                            <InputSelect
                                label={"携帯電話"}
                                value={values.contactNumber}
                                handleChange={handleChange}
                                name={"contactNumber"}
                                type="text"
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

                            <Flex justifyContent={"space-between"}>
                                <SmallFormLabel title={t("性別")} />
                                <MySelect
                                    value={values.gender}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    options={USER_GENDER(t)}
                                    name="gender"
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
                        <ReactDataTableComponent handleSubmit={handleClick} column={column} data={tableData} />
                    )}
                </Box>
            </>
        </Box>
    );
};

export default UserList;
