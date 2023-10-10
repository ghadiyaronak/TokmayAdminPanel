import { Badge, Box, Flex, HStack, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import MainHeading from "../../../components/header/MainHeading";
import TableHeading from "../../../components/table/TableHeading";
import { AiOutlineDelete } from "react-icons/ai";
import dayjs from "dayjs";
import { useCallback, useState, useEffect, useMemo } from "react";
import AdminAddButton from "../../../components/button/AdminAddButton";
import AddAdminModal from "../../../components/modal/AddAdminModal";
import { useFormik } from "formik";
import DateSelect from "../../../components/customSelect/DateSelect";
import { globalStyles } from "../../../components/theme/styles";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import { AxiosError } from "axios";
import ReactDataTableComponent from "../../../components/table/ReactDataTable";
import DeleteModal from "../../../components/modal/DeleteAdminModal";
import UpdateAdminModal from "../../../components/modal/UpdateAdminModal";
import ReactDatePicker from "react-datepicker";
import { ja } from "date-fns/locale";
import useHelperHook from "../../../hooks/useHelperHook";
import useAdminHook from "./useAdminHook";
import TableColumn from "../../../components/table/TableColumn";
import { AdminProps, MANAGER_STATUS } from "./manager.types";
import InputSelect from "../../../components/filters/InputSelect";
import MySelect from "../../../components/filters/MySelect";
import { endOfDay, startOfDay } from "date-fns";
import CustomLoader from "../../../components/loader/CustomLoader";

const ManagerList = () => {
    const { navigate, t, toast } = useHelperHook();
    const {
        adminData,
        isLoading,
        setIsLoading,
        selectedData,
        setSelectedData,
        deleteAdmin,
        getAllManager,
        setAdminData
    } = useAdminHook();

    const [tableData, setTableData] = useState<AdminProps[]>([]);
    async function fetchData() {
        setIsLoading(true);
        try {
            const managerData = await getAllManager();
            setAdminData(managerData);
            setTableData(managerData);
            setIsLoading(false);
        } catch (error) {
            console.log({ error });
            setIsLoading(false);
        }
    }

    const [selectedRows, setSelectedRows] = useState([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

    const [disableReset, setDisableReset] = useState<boolean>(true);

    //modal function for Add admin props
    const { isOpen: AddAdminIsOpen, onOpen: AddAdminOnOpen, onClose: AddAdminOnClose } = useDisclosure();
    const { isOpen: isDeleteGroupOpen, onOpen: onDeleteGroupOpen, onClose: onDeleteGroupClose } = useDisclosure();
    const { isOpen: isEditAdminOpen, onOpen: onEditAdminOpen, onClose: onEditAdminClose } = useDisclosure();

    const handleEdit = (data: AdminProps) => {
        setSelectedData(data);
        onEditAdminOpen();
    };

    const handleDelete = (data: AdminProps) => {
        setSelectedData(data);
        onDeleteGroupOpen();
    };

    const handleSearchData = () => {
        setDisableReset(false);
        handleFilteredData();
    };

    const { values, handleSubmit, touched, setFieldValue, resetForm, setFieldTouched, dirty, handleChange } = useFormik(
        {
            initialValues: {
                search: "",
                status: {
                    label: "",
                    value: ""
                },
                email: "",
                date: "",

                defaultStatus: ""
            },
            onSubmit: handleSearchData
        }
    );

    // All Filter
    const handleFilteredData = () => {
        let filterData = adminData.length > 0 ? [...adminData] : [];

        if (values.search) {
            const lowerName = values.search.trim().toLowerCase();
            filterData = filterData.filter((data: any) =>
                // data?.email?.toString().toLowerCase().includes(lowerName) ||
                data?.userName?.toString().toLowerCase().includes(lowerName)
            );
        }

        if (values.status.value != "") {
            filterData = filterData.filter((data: any) => data?.status.toString() == values.status?.value);
        }

        if (values.email) {
            if (values.email) {
                const lowerName = values.email.trim().toLowerCase();
                filterData = filterData.filter((data: any) =>
                    data?.email?.toString().toLowerCase().includes(lowerName)
                );
            }
        }

        if (!endDate && startDate) {
            filterData = filterData.filter((data: any) => {
                return startOfDay(new Date(data.createdAt)).getTime() >= startOfDay(new Date(startDate)).getTime();
            });
        }

        if (endDate && !startDate) {
            filterData = filterData.filter(
                (data: any) => endOfDay(new Date(endDate)) >= startOfDay(new Date(data.createdAt))
            );
        }

        if (endDate && startDate) {
            filterData = filterData.filter(
                (data: any) =>
                    startOfDay(new Date(startDate)) <= startOfDay(new Date(data.createdAt)) &&
                    endOfDay(new Date(endDate)) >= startOfDay(new Date(data.createdAt))
            );
        }

        setTableData(filterData);
    };

    const handleDeleteAdmin = async () => {
        setIsDeleteLoading(true);
        try {
            const result = await deleteAdmin(selectedData);
            toast({
                title: result,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            fetchData();
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsDeleteLoading(false);
            onDeleteGroupClose();
        }
    };

    const column = [
        {
            id: 1,
            name: <TableHeading heading="担当者名" />,
            selector: (row: any) => row?.userName,
            sortable: true,
            wrap: true,
            width: "200px",
            cell: (row: any) => {
                return (
                    <TableColumn
                        column={row?.userName}
                        handleClick={() => {
                            handleEdit(row);
                        }}
                    />
                );
            }
        },
        {
            id: 2,
            name: <TableHeading heading={t("common.email")} />,
            selector: (row: any) => row?.email,
            sortable: true,
            wrap: true,
            width: "300px",
            cell: (row: any) => {
                return (
                    <TableColumn
                        column={row?.email}
                        handleClick={() => {
                            handleEdit(row);
                        }}
                    />
                );
            }
        },
        {
            id: 3,
            name: <TableHeading heading={t("作成日")} />,
            selector: (row: any) => row?.createdAt,
            sortable: true,
            wrap: true,
            width: "150px",
            cell: (row: any) => {
                return (
                    <TableColumn
                        column={row?.createdAt && dayjs(row?.createdAt).format("YYYY/MM/DD")}
                        handleClick={() => {
                            handleEdit(row);
                        }}
                    />
                );
            }
        },
        {
            id: 4,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.status,
            sortable: true,
            wrap: true,
            cell: (row: any) => (
                <Badge
                    margin={"auto"}
                    variant={String(row?.status) === "true" ? "success" : "danger"}
                    onClick={() => {
                        handleEdit(row);
                    }}
                >
                    {row.status ? "アクティブ" : "ブロック"}
                </Badge>
            ),
            width: "200px"
        },
        {
            id: 5,
            name: <TableHeading heading={t("common.delete")} />,
            sortable: false,
            wrap: true,
            width: "150px",
            omit: false,
            cell: (row: any) => (
                <HStack>
                    <AiOutlineDelete
                        size={"22px"}
                        cursor={"pointer"}
                        onClick={() => {
                            handleDelete(row);
                        }}
                    />
                </HStack>
            )
        }
    ];

    const handleRowSelected = useCallback((state: any) => {
        setSelectedRows(state.selectedRows);
    }, []);

    useEffect(() => {
        fetchData();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setTableData(adminData);
        resetForm();
    };

    return (
        <>
            <Box>
                <Stack direction={"row"} mt={5} mb={1} alignItems={"center"} justifyContent={"space-between"}>
                    <MainHeading title={t("common.manager")} />
                    <AdminAddButton title="+ 担当者を追加" onOpen={AddAdminOnOpen} />
                </Stack>

                <Box bgColor={"white"} p={4} rounded={"lg"} shadow={"sm"} my={3} mt={0}>
                    <Text display={"flex"} fontWeight={"bold"} mb={3} alignItems={"center"}>
                        {t("common.search_condition")}
                    </Text>

                    <Flex gap={5} w={"full"} alignItems={"center"}>
                        <Flex flexDir={"column"} gap={3} w={"xs"}>
                            <InputSelect
                                label={"担当者名"}
                                value={values.search}
                                handleChange={handleChange}
                                name={"search"}
                                type="text"
                            />
                            <InputSelect
                                label={t("common.email")}
                                value={values.email}
                                handleChange={handleChange}
                                name={"email"}
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
                                    value={values.status}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    options={MANAGER_STATUS(t)}
                                    name="status"
                                    multi={false}
                                />
                            </Flex>
                        </Flex>

                        <Box
                            w={{ base: "full", sm: "0.5px" }}
                            h={{ base: "0.4", sm: 40 }}
                            bgColor={globalStyles.colors.mainColor}
                        />
                        <Flex gap={3} flexDir={"column"} ml={4} mt={"-3.5"}>
                            {/* <ExportExcel /> */}
                            <Box w={"40"}></Box>
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
                            handleSubmit={handleEdit}
                            progressPending={isLoading}
                            onSelectedRowsChange={handleRowSelected}
                            isSelector={true}
                        />
                    )}
                </Box>
            </Box>

            {/* admin add modal  */}
            <AddAdminModal isOpen={AddAdminIsOpen} onClose={AddAdminOnClose} fetchData={fetchData} />

            <UpdateAdminModal
                isOpen={isEditAdminOpen}
                onClose={onEditAdminClose}
                getAll={fetchData}
                selectedData={selectedData}
            />

            <DeleteModal
                isOpen={isDeleteGroupOpen}
                onClose={onDeleteGroupClose}
                handleDelete={handleDeleteAdmin}
                modalHeading="担当者を削除"
                modalMessage="本当に担当者を削除しますか?"
                isLoading={isDeleteLoading}
            />
        </>
    );
};

export default ManagerList;
