// services
import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { globalStyles } from "../../../theme/styles";
import { USER_STATUS } from "../Users/user.type";
import { useFormik } from "formik";

// hooks
import useHelperHook from "../../../hooks/useHelperHook";
import cashRequestHook from "./cashRequestHook";

// components
import MainHeading from "../../../components/header/MainHeading";
import ReactDataTableComponent from "../../../components/table/ReactDataTable";
import TableHeading from "../../../components/table/TableHeading";
import UserTable from "../../../components/table/UserTable";
import ExportExcel from "../../../components/button/Excelexport";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import InputSelect from "../../../components/filters/InputSelect";
import DateSelect from "../../../components/customSelect/DateSelect";
import MySelect from "../../../components/filters/MySelect";

const CashRequest = () => {
    // hooks
    const { t } = useHelperHook();
    const { endDate, isLoading, setEndDate, setStartDate, startDate } = cashRequestHook();

    // data
    const cashdata = [
        {
            id: 1,
            user_name: "Ronak",
            ID: "1316542156464eff",
            personal_information: "閲覧",
            Holding_coin: "193,894",
            Application_amount: "5,000",
            coins_after_conversion: "188,894 C",
            Remittance_method: "銀行振込",
            Account_information: "見る",
            age: "20",
            Profession: "歯科助手",
            gender: "女性",
            phone_number: "41745187147",
            Male_adress: "test123@gmail.com",
            status: "未処理"
        },
        {
            id: 2,
            user_name: "Sahil",
            ID: "1316542156464eff",
            personal_information: "閲覧",
            Holding_coin: "193,894",
            Application_amount: "5,000",
            coins_after_conversion: "188,894 C",
            Remittance_method: "銀行振込",
            Account_information: "見る",
            age: "20",
            Profession: "歯科助手",
            gender: "女性",
            phone_number: "41745187147",
            Male_adress: "test123@gmail.com",
            status: "未処理"
        },
        {
            id: 3,
            user_name: "Akshay",
            ID: "1316542156464eff",
            personal_information: "閲覧",
            Holding_coin: "193,894",
            Application_amount: "5,000",
            coins_after_conversion: "188,894 C",
            Remittance_method: "銀行振込",
            Account_information: "見る",
            age: "20",
            Profession: "歯科助手",
            gender: "女性",
            phone_number: "41745187147",
            Male_adress: "test123@gmail.com",
            status: "未処理"
        },
        {
            id: 4,
            user_name: "Chetan",
            ID: "1316542156464eff",
            personal_information: "閲覧",
            Holding_coin: "193,894",
            Application_amount: "5,000",
            coins_after_conversion: "188,894 C",
            Remittance_method: "銀行振込",
            Account_information: "見る",
            age: "20",
            Profession: "歯科助手",
            gender: "女性",
            phone_number: "41745187147",
            Male_adress: "test123@gmail.com",
            status: "未処理"
        },
        {
            id: 5,
            user_name: "Jay",
            ID: "1316542156464eff",
            personal_information: "閲覧",
            Holding_coin: "193,894",
            Application_amount: "5,000",
            coins_after_conversion: "188,894 C",
            Remittance_method: "銀行振込",
            Account_information: "見る",
            age: "20",
            Profession: "歯科助手",
            gender: "女性",
            phone_number: "41745187147",
            Male_adress: "test123@gmail.com",
            status: "未処理"
        }
    ];

    // data table
    const column = [
        {
            id: 1,
            name: <TableHeading heading={t("ユーザーネーム")} />,
            selector: (row: any) => row?.user_name,
            sortable: true,
            wrap: true,
            omit: false,
            width: "170px",
            cell: (row: any) => {
                return <UserTable column={row?.user_name ?? "--"} />;
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
            selector: (row: any) => row?.personal_information,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.personal_information ?? "--"} />;
            }
        },
        {
            id: 4,
            name: <TableHeading heading={t("保有コイン")} />,
            selector: (row: any) => row?.Holding_coin,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.Holding_coin ?? "--"} />;
            }
        },
        {
            id: 5,
            name: <TableHeading heading={t("申請額")} />,
            selector: (row: any) => row?.Application_amount,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.Application_amount ?? "--"} />;
            }
        },
        {
            id: 6,
            name: <TableHeading heading={t("換金後コイン")} />,
            selector: (row: any) => row?.coins_after_conversion,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.coins_after_conversion ?? "--"} />;
            }
        },
        {
            id: 7,
            name: <TableHeading heading={t("送金方法")} />,
            selector: (row: any) => row?.Remittance_method,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.Remittance_method ?? "--"} />;
            }
        },
        {
            id: 8,
            name: <TableHeading heading={t("口座情報")} />,
            selector: (row: any) => row?.Account_information,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.Account_information ?? "--"} />;
            }
        },
        {
            id: 9,
            name: <TableHeading heading={t("年代")} />,
            selector: (row: any) => row?.age,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.age ?? "--"} />;
            }
        },
        {
            id: 10,
            name: <TableHeading heading={t("職業")} />,
            selector: (row: any) => row?.Profession,
            sortable: true,
            wrap: true,
            omit: false,
            width: "120px",
            cell: (row: any) => {
                return <UserTable column={row?.Profession ?? "--"} />;
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
            selector: (row: any) => row?.phone_number,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.phone_number ?? "--"} />;
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

    // api call
    const onSubmit = () => {};

    // excel download
    const getExcelData = () => {};

    // reset form
    const handleReset = () => {
        resetForm();
    };

    const { values, handleSubmit, setFieldValue, resetForm, setFieldTouched, dirty, handleChange } = useFormik({
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
        onSubmit
    });

    return (
        <>
            <Stack direction={"row"} mt={5} mb={1} alignItems={"center"} justifyContent={"space-between"}>
                <MainHeading title={t("換金依頼")} />
            </Stack>

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
                <ReactDataTableComponent column={column} data={cashdata} />
            </Box>
        </>
    );
};

export default CashRequest;
