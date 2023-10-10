// Chakra imports
import { Box, Button, Card, Flex, Icon, Img, Text, useColorModeValue } from "@chakra-ui/react";
import CustomCard from "../../../../components/card/Card";
import LineChart from "../../../../components/charts/LineChart";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { numberWithCommas } from "../../../../utils/helperFunctions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface LineChartProps {
    linedata?: any;
    lineoption?: any;
    title?: string;
}

const TotalSpent = (props: LineChartProps) => {
    const { ...rest } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
    const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });
    const { t } = useTranslation();
    return (
        <CustomCard alignItems="center" flexDirection="column" w="100%" {...rest}>
            <Box h="80%" w="full">
                <Flex mb="8px" justifyContent="space-between" align="center">
                    <Text color={"#FF0000"} textAlign="left" fontWeight="semibold" fontSize="2xl">
                        {props.title}
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
                <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
                    <Flex flexDirection="column" me="20px" mt="28px">
                        <Text color={textColor} fontSize="34px" textAlign="start" fontWeight="700" lineHeight="100%">
                            $37.5K
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
                    </Flex>
                    <Box minH="260px" minW="75%">
                        <LineChart chartData={props.linedata} chartOptions={props.lineoption} />
                    </Box>
                </Flex>
            </Box>
        </CustomCard>
    );
};

export default TotalSpent;
