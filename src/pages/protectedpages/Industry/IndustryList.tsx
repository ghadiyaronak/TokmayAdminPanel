import { Badge, Box, HStack, Stack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MainHeading from "../../../components/header/MainHeading";
import { useTranslation } from "react-i18next";
import ReactDataTableComponent from "../../../components/table/ReactDataTable";
import TableHeading from "../../../components/table/TableHeading";
import UserTable from "../../../components/table/UserTable";
import useIndustryHook from "./useIndustryHook";
import { IndustryProps } from "./IndustryType";
import AddIndustryModal from "../../../components/modal/AddIndustryModal";
import AdminAddButton from "../../../components/button/AdminAddButton";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "../../../components/modal/DeleteAdminModal";
import useHelperHook from "../../../hooks/useHelperHook";
import { AxiosError } from "axios";

const IndustryList = () => {
    const { navigate, t, toast } = useHelperHook();
    const { getIndustry, selectedData, deleteIndustry, setSelectedData, setIndustryData, industryData } =
        useIndustryHook();
    const [tableData, setTableData] = useState<IndustryProps[]>([]);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

    const { isOpen: AddIndustryIsOpen, onOpen: AddIndustryOnOpen, onClose: AddIndustryOnClose } = useDisclosure();
    const { isOpen: isDeleteGroupOpen, onOpen: onDeleteGroupOpen, onClose: onDeleteGroupClose } = useDisclosure();

    const handleDelete = (data: IndustryProps) => {
        setSelectedData(data);
        onDeleteGroupOpen();
    };

    const data = [
        {
            id: 1,
            name: "abcd"
        }
    ];

    const column = [
        {
            id: 1,
            name: <TableHeading heading={t("name")} />,
            selector: (row: any) => row?.name,
            sortable: false,
            wrap: true,
            omit: false,
            width: "150px",
            cell: (row: any) => {
                return <UserTable column={row?.name} />;
            }
        },
        {
            id: 2,
            name: <TableHeading heading={t("count")} />,
            selector: (row: any) => row?.count,
            sortable: true,
            wrap: true,
            width: "250px",
            cell: (row: any) => {
                return <UserTable column={row?.count} />;
            }
        },
        {
            id: 3,
            name: <TableHeading heading={t("common.status")} />,
            selector: (row: any) => row?.status,
            sortable: true,
            wrap: true,
            width: "150px",
            omit: false,
            cell: (row: any) => (
                <Badge margin={"auto"} variant={String(row?.status) === "true" ? "success" : "danger"}>
                    {row.status ? "アクティブ" : "非アクティブ"}
                </Badge>
            )
        },
        {
            id: 5,
            name: <TableHeading heading={t("common.delete")} />,
            sortable: false,
            wrap: true,
            width: "150px",
            omit: false,
            cell: (row: any) => (
                <HStack spacing={5} m={"auto"}>
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

    async function fatchData() {
        try {
            const industryData = await getIndustry();
            setIndustryData(industryData);
            setTableData(industryData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteIndustry = async () => {
        setIsDeleteLoading(true);
        try {
            const result = await deleteIndustry(selectedData);
            toast({
                title: result,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            fatchData();
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

    useEffect(() => {
        fatchData();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <Box>
            <Stack direction={"row"} mt={5} mb={1} alignItems={"center"} justifyContent={"space-between"}>
                <MainHeading title={t("Industry")} />
                <AdminAddButton title="+ Industry" onOpen={AddIndustryOnOpen} />
            </Stack>
            <>
                <Box rounded={"lg"} bgColor={"white"} px={5}>
                    <ReactDataTableComponent column={column} data={tableData} />
                </Box>
            </>

            <AddIndustryModal isOpen={AddIndustryIsOpen} onClose={AddIndustryOnClose} fetchData={fatchData} />

            <DeleteModal
                isOpen={isDeleteGroupOpen}
                onClose={onDeleteGroupClose}
                handleDelete={handleDeleteIndustry}
                modalHeading="担当者を削除"
                modalMessage="本当に担当者を削除しますか?"
                isLoading={isDeleteLoading}
            />
        </Box>
    );
};

export default IndustryList;
