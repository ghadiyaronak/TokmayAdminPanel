import { Box, SimpleGrid, Icon, useColorModeValue, Image, Skeleton } from "@chakra-ui/react";
import MiniStatistics from "../../../components/card/MiniStatistics";
// import IconBox from "../../../components/icons/IconBox";
import {
    barChartDataConsumption,
    barChartOptionsConsumption,
    lineChartOptionsTotalSpent,
    lineChartDataTotalSpent1,
    DashboardStatistics,
    lineChartDataTotalSpent,
    getDashboardData,
    AdminContractData,
    AdminContractByIndustryData
} from "../../../utils/data";
import CheckTable from "../rtl/components/CheckTable";
import TotalSpent from "./components/TotalSpents";
import WeeklyRevenue from "./components/WeeklyRevenue";
import tableDataCheck from "./variables/tableDataCheck";
import { Translation, useTranslation } from "react-i18next";
// import ContractCountService from "../../../services/ContractCountService";
import { globalStyles } from "../../../theme/styles";
import TotalSpent1 from "./components/TotalSpents1";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
// import UserCountService from "../../../services/UserCountService";
// import DashboardService from "../../../services/DashboardService";
// import LoaderComponent from "../../../components/loader/LoaderComponent";
import CheckTableForAdminInd from "../rtl/components/CheckTableForAdminInd";
// import SkeletonLoader from "../../../components/common/SkeletonLoader";
// import { lineChartOptionsTotalSpent2 } from "../../../utils/data2";

const DashboardStats = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const brandColor = useColorModeValue("brand.200", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [contract, setContract] = useState();
    const [user, setUser] = useState();

    const [adminContract, setAdminContract] = useState<any>();
    const [adminContractByIndustry, setAdminContractByIndustry] = useState<any>();

    //user and contract data

    const LineChartUserAndContractData = [
        {
            name: "契約",
            data: [5, 4, 3, 2, 1]
        },
        {
            name: "ユーザー",
            data: [5, 4, 3, 2, 1]
        }
    ];

    const LineChartMatchingAndMatchingRate = [
        {
            name: "マッチング率",
            data: 12
        },
        {
            name: "マッチング数",
            data: 10
        },
        {
            name: "案件数",
            data: 20
        }
    ];

    //admin contracts data setup
    type RowObj = {
        name1: [string, boolean];
        progress: string;
        quantity: number;
        date: string;
        info: boolean;
    };

    // const AdminContractData: RowObj[] = [];
    // for (let i = 0; i < adminContract?.length; i++) {
    //     AdminContractData?.push({
    //         name1: [adminContract[i]?.name, true],
    //         quantity: Number(adminContract[i]?.contract),
    //         progress: String(adminContract[i]?.successRatio),
    //         date: String(adminContract[i]?.numberOfCompaniesInCharge),
    //         info: true
    //     });
    // }

    //admin contracts by industry set up
    type RowObj1 = {
        name1: [string, boolean];
        progress: number;
        quantity: number;

        info: boolean;
    };

    // const AdminContractByIndustryData: RowObj1[] = [];
    // for (let i = 0; i < adminContractByIndustry?.length; i++) {
    //     AdminContractByIndustryData?.push({
    //         name1: [adminContractByIndustry[i]?._id, true],
    //         progress: Number(adminContractByIndustry[i]?.numberOfNewContract),
    //         quantity: Number(adminContractByIndustry[i]?.totalContractAmount),

    //         info: true
    //     });
    // }

    return (
        // isLoading ? (
        //     <LoaderComponent />
        // ) : (
        <Box w={"full"}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} my={4} gap={1}>
                {getDashboardData(contract, user).map((statistics: any) => (
                    <MiniStatistics
                        startContent={
                            statistics.icon && (
                                <Image
                                    w={{ base: "56px", md: "40px", lg: "45px", xl: "45px" }}
                                    h={{ base: "56px", md: "40px", lg: "45px", xl: "45px" }}
                                    src={statistics.icon}
                                />
                            )
                        }
                        name={t(statistics.name)}
                        value={statistics.value}
                        label={statistics.label}
                        path={statistics.path}
                        // label={statistics.label}
                        key={statistics.id}
                    />
                ))}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
                <TotalSpent
                    linedata={LineChartUserAndContractData}
                    lineoption={lineChartOptionsTotalSpent}
                    title={"総会員数 （個人・法人分けたもの）"}
                />

                <TotalSpent
                    linedata={LineChartUserAndContractData}
                    lineoption={lineChartOptionsTotalSpent}
                    title={"マッチング率 / マッチング数 / 案件数"}
                />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
                <CheckTable tableData1={AdminContractData} />

                <CheckTableForAdminInd tableData1={AdminContractByIndustryData} />
            </SimpleGrid>
        </Box>
    );
};

export default DashboardStats;
