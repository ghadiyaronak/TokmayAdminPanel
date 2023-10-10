import {
    Flex,
    Box,
    Table,
    Checkbox,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Img,
    MenuButton,
    Icon,
    Button
} from "@chakra-ui/react";
import * as React from "react";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";

// Custom components
import CustomCard from "../../../../components/card/Card";
import Banner from "../../../../components/menu/MainMenu";
import { MdOutlineMoreHoriz } from "react-icons/md";

type RowObj = {
    name: string;
    progress: string;
    quantity: number;
    date: string;
    info: boolean;
};

const columnHelper = createColumnHelper<RowObj>();

export default function CheckTable(props: { tableData1: any }) {
    const { ...rest } = props;
    const { tableData1 } = props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    let defaultData = tableData1;
    const columns = [
        columnHelper.accessor("name", {
            id: "name",
            header: () => (
                <Text
                    justifyContent="space-between"
                    // align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                >
                    名前
                </Text>
            ),
            cell: (info: any) => (
                <Flex align="center">
                    {/* <Checkbox defaultChecked={info.getValue()[1]} colorScheme="brandScheme" me="10px" /> */}
                    <Text color={textColor} fontSize="sm" fontWeight="700">
                        {info.getValue() ?? "-"}
                    </Text>
                </Flex>
            )
        }),
        columnHelper.accessor("quantity", {
            id: "quantity",
            header: () => (
                <Text
                    justifyContent="space-between"
                    // align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                >
                    契約
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            )
        }),
        columnHelper.accessor("progress", {
            id: "progress",
            header: () => (
                <Text
                    justifyContent="space-between"
                    // align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                >
                    成約率
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}%
                </Text>
            )
        }),
        columnHelper.accessor("date", {
            id: "date",
            header: () => (
                <Text
                    justifyContent="space-between"
                    // align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                >
                    担当社数
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize="sm" fontWeight="700">
                    {info.getValue()}
                </Text>
            )
        })
    ];
    const [data, setData] = React.useState(() => [...defaultData]);
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true
    });
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
    const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });
    const iconColor = useColorModeValue("brand.500", "white");

    return (
        <CustomCard flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
                <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                    担当者別 営業成績
                </Text>
                {/* <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    bg={"#F4F7FE"}
                    h={"37px"}
                    w={"37px"}
                    borderRadius={"xl"}
                >
                    <Img h={"24px"} w={"24px"} src="more_horiz.png" />
                </Flex> */}
                <Button
                    alignItems="center"
                    justifyContent="center"
                    bg={bgButton}
                    _hover={bgHover}
                    _focus={bgFocus}
                    _active={bgFocus}
                    w="37px"
                    h="37px"
                    lineHeight="100%"
                    // onClick={onOpen1}
                    borderRadius="10px"
                    {...rest}
                >
                    <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
                </Button>
                {/* <Banner /> */}
            </Flex>
            <Box overflowY="auto" maxH="400px">
                <Table variant="simple" color="gray.500" mb="24px" mt="12px">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr
                                key={headerGroup.id}
                                css={{
                                    position: "sticky",
                                    top: 0,
                                    backgroundColor: "#ffffff",
                                    zIndex: 1
                                }}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            pe="10px"
                                            borderColor={borderColor}
                                            cursor="pointer"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <Flex
                                                justifyContent="space-between"
                                                align="center"
                                                fontSize={{ sm: "10px", lg: "12px" }}
                                                color="gray.400"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: "",
                                                    desc: ""
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </Flex>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table
                            .getRowModel()
                            // .rows.slice(0, 5)
                            .rows.slice(0, tableData1.length)
                            .map((row) => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td
                                                    key={cell.id}
                                                    fontSize={{ sm: "14px" }}
                                                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                                    borderColor="transparent"
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Td>
                                            );
                                        })}
                                    </Tr>
                                );
                            })}
                    </Tbody>
                </Table>
            </Box>
        </CustomCard>
    );
}
