// Chakra imports
import { Box, Button, Flex, Icon, Img, Text, useColorModeValue } from "@chakra-ui/react";
import CustomCard from "../../../../components/card/Card";
// Custom components
import ColumnChart from "../../../../components/charts/BarChart";
import { MdBarChart } from "react-icons/md";
import { numberWithCommas } from "../../../../utils/helperFunctions";
import { useTranslation } from "react-i18next";
import { barChartDataConsumption, barChartOptionsConsumption } from "../variables/newCharts";
interface BarChartProps {
    bardata: any;
    baroption?: any;
}

export default function WeeklyRevenue(props: BarChartProps) {
    const { ...rest } = props;
    const { t } = useTranslation();
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
    const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });
    return (
        // <CustomCard
        //     // overflowX={{ sm: "scroll", lg: "hidden" }}
        //     alignItems="center"
        //     flexDirection="column"
        //     w="full"
        //     {...rest}
        // >
        //     <Box h="80%" w="full">
        //         <Flex mb="8px" justifyContent="space-between" align="center">
        //             <Text textAlign="left" fontWeight="semibold" fontSize="2xl">
        //                 {t("dashboard.weekly_revenue")}
        //             </Text>
        //             <Flex
        //                 justifyContent={"center"}
        //                 alignItems={"center"}
        //                 bg={"#F4F7FE"}
        //                 h={"37px"}
        //                 w={"37px"}
        //                 borderRadius={"xl"}
        //             >
        //                 <Img h={"24px"} w={"24px"} src="bar_chart.png" />
        //             </Flex>
        //         </Flex>
        //         <Flex gap={5}>
        //             <Text fontWeight={"bolder"} fontSize="xl">
        //                 月間総売上 - 23年10月
        //             </Text>
        //             <Text fontWeight={"bolder"} fontSize="xl">
        //                 12345678円
        //             </Text>
        //         </Flex>
        //         <ColumnChart chartData={props.bardata} chartOptions={props.baroption} />
        //     </Box>
        // </CustomCard>
        <CustomCard alignItems="center" flexDirection="column" w="full" {...rest}>
            <Box h="80%" w="full">
                <Flex mb="8px" justifyContent="space-between" align="center">
                    <Text textAlign="left" fontWeight="semibold" fontSize="2xl">
                        {t("dashboard.weekly_revenue")}
                    </Text>

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
                        borderRadius="10px"
                        {...rest}
                    >
                        <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
                    </Button>
                </Flex>
                <Flex gap={5}>
                    <Text fontWeight={"bolder"} fontSize="xl">
                        月間総売上 - 23年10月
                    </Text>
                    <Text fontWeight={"bolder"} fontSize="xl">
                        12345678円
                    </Text>
                </Flex>

                <Box h="240px" mt="auto">
                    {/* <ColumnChart chartData={props.bardata} chartOptions={props.baroption} /> */}
                    <ColumnChart chartData={barChartDataConsumption} chartOptions={barChartOptionsConsumption} />
                </Box>
            </Box>
        </CustomCard>
    );
}
