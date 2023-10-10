// Chakra imports
import { Box, Button, Card, Flex, Icon, Img, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
// import Card from "components/card/Card";
import CustomCard from "../../../../components/card/Card";
import LineChart from "../../../../components/charts/LineChart";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { numberWithCommas } from "../../../../utils/helperFunctions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from "../variables/newCharts";
interface LineChartProps {
    linedata?: any;
    lineoption?: any;
}

// (  company : CompanyCardProps),

const TotalSpent1 = (props: LineChartProps) => {
    const { ...rest } = props;
    // const SixMonthRevenueData = [12, 23, 39, 39, 50, 10];
    // const [lastSixMonthData, setLastSixMonthData] = useState([]);
    // Chakra Color Mode
    // const textColor = useColorModeValue("secondaryGray.900", "white");
    // const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    // const iconColor = useColorModeValue("brand.500", "white");
    // const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    // const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
    // const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
    const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });
    const { t } = useTranslation();
    return (
        // <CustomCard alignItems="center" flexDirection="column" w="100%" {...rest}>
        //     <Box h="80%" w="full">
        //         <Flex mb="8px" justifyContent="space-between" align="center">
        //             <Text color={"#FF0000"} textAlign="left" fontWeight="semibold" fontSize="2xl">
        //                 {/* {t("dashboard.total_earnings_six_month")} */}
        //                 総会員数 （個人・法人分けたもの）
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
        //         <Text fontWeight={"bolder"} fontSize="4xl">
        //             ¥{numberWithCommas(100000)}
        //         </Text>
        //         <LineChart chartData={props.linedata} chartOptions={props.lineoption} />
        //     </Box>
        // </CustomCard>
        <CustomCard alignItems="center" flexDirection="column" w="100%" {...rest}>
            {/* <Flex justify="space-between" ps="0px" pe="20px" pt="5px"> */}
            <Box h="80%" w="full">
                <Flex mb="8px" justifyContent="space-between" align="center">
                    <Text color={"#FF0000"} textAlign="left" fontWeight="semibold" fontSize="2xl">
                        {/* {t("dashboard.total_earnings_six_month")} */}
                        マッチング率 / マッチング数 / 案件数
                    </Text>
                    <Button
                        ms="auto"
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
                {/* </Flex> */}
                <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
                    {/* <Flex flexDirection="column" me="20px" mt="28px">
                        <Text color={textColor} fontSize="34px" textAlign="start" fontWeight="700" lineHeight="100%">
                            78%
                        </Text>
                        <Flex align="center" mb="20px">
                            <Text color="secondaryGray.600" fontSize="sm" fontWeight="500" mt="4px" me="12px">
                                Total Spent
                            </Text>
                            <Flex align="center">
                                <Icon as={RiArrowUpSFill} color="green.500" me="2px" mt="2px" />
                                <Text color="green.500" fontSize="sm" fontWeight="700">
                                    +2.45%
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex align="center">
                            <Icon as={IoCheckmarkCircle} color="green.500" me="4px" />
                            <Text color="green.500" fontSize="md" fontWeight="700">
                                On track
                            </Text>
                        </Flex>
                    </Flex> */}
                    <Box minH="260px" minW="full">
                        {/* <LineChart chartData={props.linedata} chartOptions={props.lineoption} /> */}
                        <LineChart chartData={props.linedata} chartOptions={props.lineoption} />
                    </Box>
                </Flex>
            </Box>
        </CustomCard>
    );
};

export default TotalSpent1;
