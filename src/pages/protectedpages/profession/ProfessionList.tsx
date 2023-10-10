// services
import { Badge, Box, Flex, HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { PROFESSION_STATUS, ProfessionProps } from "./ProfessionTypes";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useFormik } from "formik";

//hooks
import useHelperHook from "../../../hooks/useHelperHook";
import useProfessionHook from "./useProfessionHook";

// components
import { globalStyles } from "../../../components/theme/styles";
import MainHeading from "../../../components/header/MainHeading";
import AdminAddButton from "../../../components/button/AdminAddButton";
import ReactDataTableComponent from "../../../components/table/ReactDataTable";
import TableHeading from "../../../components/table/TableHeading";
import UserTable from "../../../components/table/UserTable";
import AddProfessionModal from "../../../components/modal/AddProfessionModal";
import InputSelect from "../../../components/filters/InputSelect";
import MySelect from "../../../components/filters/MySelect";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import UpdateProfessionModal from "../../../components/modal/UpdateProfessionModal";
import DeleteProfessionModal from "../../../components/modal/DeleteProfessionModal";
import CustomLoader from "../../../components/loader/CustomLoader";

const ProfessionList = () => {
    // hooks
    const { t, toast } = useHelperHook();
    const {
        getAllProfession,
        deleteProfession,
        selectedData,
        setSelectedData,
        setProfessionData,
        professionData,
        tableData,
        setDisableReset,
        setIsDeleteLoading,
        setTableData,
        isDeleteLoading,
        isLoading,
        setIsLoading
    } = useProfessionHook();

    const { isOpen: AddProfessionIsOpen, onOpen: AddProfessionOnOpen, onClose: AddProfessionOnClose } = useDisclosure();
    const { isOpen: isDeleteGroupOpen, onOpen: onDeleteGroupOpen, onClose: onDeleteGroupClose } = useDisclosure();
    const {
        isOpen: isEditProfessionOpen,
        onOpen: onEditProfessionOpen,
        onClose: onEditProfessionClose
    } = useDisclosure();

    const handleDelete = (data: ProfessionProps) => {
        setSelectedData(data);
        onDeleteGroupOpen();
    };

    const handleEdit = (data: ProfessionProps) => {
        setSelectedData(data);
        onEditProfessionOpen();
    };

    const handleSearchData = () => {
        setDisableReset(false);
        handleFilteredData();
    };

    const handleReset = () => {
        setTableData(professionData);
        resetForm();
    };

    const { values, handleSubmit, touched, setFieldValue, resetForm, setFieldTouched, dirty, handleChange } = useFormik(
        {
            initialValues: {
                professionName: "",
                professionStatus: {
                    label: "",
                    value: ""
                }
            },
            onSubmit: handleSearchData
        }
    );

    // filters
    const handleFilteredData = () => {
        let filterData = professionData.length > 0 ? [...professionData] : [];

        if (values.professionName) {
            const lowerName = values.professionName.trim().toLowerCase();
            filterData = filterData.filter((data: any) =>
                // data?.email?.toString().toLowerCase().includes(lowerName) ||
                data?.professionName?.toString().toLowerCase().includes(lowerName)
            );
        }

        if (values.professionStatus.value != "") {
            filterData = filterData.filter(
                (data: any) => data?.professionStatus.toString() == values.professionStatus?.value
            );
        }

        setTableData(filterData);
    };

    // api call
    const handleDeleteProfession = async () => {
        setIsDeleteLoading(true);
        try {
            const result = await deleteProfession(selectedData);
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

    // api call
    async function fetchData() {
        setIsLoading(true);
        try {
            const professionData = await getAllProfession();
            setProfessionData(professionData);
            setTableData(professionData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    // data table
    const column = [
        {
            id: 1,
            name: <TableHeading heading={t("名前")} />,
            selector: (row: any) => row?.professionName,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.professionName} />;
            }
        },
        {
            id: 2,
            name: <TableHeading heading={t("当ユーザー数")} />,
            selector: (row: any) => row?.totalUsers,
            sortable: true,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.totalUsers} />;
            }
        },
        {
            id: 3,
            name: <TableHeading heading={t("男性")} />,
            selector: (row: any) => row?.maleCount,
            sortable: true,
            wrap: true,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.maleCount} />;
            }
        },
        {
            id: 4,
            name: <TableHeading heading={t("女性")} />,
            selector: (row: any) => row?.femaleCount,
            sortable: true,
            wrap: true,
            width: "130px",
            cell: (row: any) => {
                return <UserTable column={row?.femaleCount} />;
            }
        },
        {
            id: 5,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.professionStatus,
            sortable: true,
            wrap: true,
            width: "150px",
            omit: false,
            cell: (row: any) => (
                <Badge margin={"auto"} variant={String(row?.professionStatus) === "true" ? "success" : "danger"}>
                    {row.professionStatus ? "アクティブ" : "ブロック"}
                </Badge>
            )
        },
        {
            id: 6,
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

    return (
        <Box>
            <Stack direction={"row"} mt={5} mb={1} alignItems={"center"} justifyContent={"space-between"}>
                <MainHeading title={t("職業")} />
                <AdminAddButton title="+ 職業" onOpen={AddProfessionOnOpen} />
            </Stack>
            <>
                <Box bgColor={"white"} p={4} rounded={"lg"} shadow={"sm"} my={3} mt={0}>
                    <Text display={"flex"} fontWeight={"bold"} mb={3} alignItems={"center"}>
                        {t("common.search_condition")}
                    </Text>

                    <Flex gap={5} w={"full"}>
                        <Flex flexDir={"column"} gap={3} w={"xs"}>
                            <InputSelect
                                label={"名前"}
                                value={values.professionName}
                                handleChange={handleChange}
                                name={"professionName"}
                                type="text"
                            />
                            <Flex justifyContent={"space-between"} gap={3}>
                                <Text fontWeight={"bold"} fontSize="sm">
                                    {t("common.status")}
                                </Text>
                                <MySelect
                                    value={values.professionStatus}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    options={PROFESSION_STATUS(t)}
                                    name="professionStatus"
                                    multi={false}
                                />
                            </Flex>
                        </Flex>
                        <Box
                            w={{ base: "full", sm: "0.5px" }}
                            // h={{ base: "0.4", sm: 40 }}
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
                        <ReactDataTableComponent handleSubmit={handleEdit} column={column} data={tableData} />
                    )}
                </Box>
            </>

            <AddProfessionModal isOpen={AddProfessionIsOpen} onClose={AddProfessionOnClose} fetchData={fetchData} />

            <UpdateProfessionModal
                isOpen={isEditProfessionOpen}
                onClose={onEditProfessionClose}
                getAll={fetchData}
                selectedData={selectedData}
                status={true}
                fetchData={fetchData}
            />

            <DeleteProfessionModal
                isOpen={isDeleteGroupOpen}
                onClose={onDeleteGroupClose}
                handleDelete={handleDeleteProfession}
                modalHeading="職業を削除"
                modalMessage="本当に職業を削除しますか?"
                isLoading={isDeleteLoading}
            />
        </Box>
    );
};

export default ProfessionList;
