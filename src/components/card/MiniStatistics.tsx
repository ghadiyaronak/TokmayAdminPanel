import { Flex, ScaleFade, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

interface MiniStatProps {
    startContent?: any;
    endContent?: any;
    name?: any;
    value?: any;
    path?: any;
    label?: any;
}

const MiniStatistics = ({ startContent, endContent, name, value, path, label }: MiniStatProps) => {
    const navigate = useNavigate();

    const handleRedirection = () => {
        navigate(path);
    };

    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Card py={3}>
                <Flex my="auto" h="full" cursor="pointer" align={"center"} justify={"center"}>
                    {startContent}

                    <Stat my="auto" ms={startContent ? 6 : 0}>
                        <StatLabel
                            lineHeight="full"
                            color={"secondaryGray.600"}
                            fontSize={{
                                base: "xs"
                            }}
                        >
                            {name}
                        </StatLabel>
                        <Flex gap={1}>
                            <StatNumber
                                color={"secondaryGray.900"}
                                fontSize={{
                                    base: "md",
                                    lg: "md",
                                    xl: "16"
                                    // "2xl": "2xl"
                                }}
                            >
                                {value}
                            </StatNumber>
                            <StatLabel
                                // lineHeight="full"
                                mt={{ base: 1, lg: "2" }}
                                fontWeight={700}
                                color={"#2B3674"}
                                fontSize={{
                                    base: "sm",
                                    lg: "2xs",
                                    xl: "2xs"
                                    // "2xl": "sm"
                                }}
                            >
                                {label}
                            </StatLabel>
                        </Flex>
                    </Stat>
                    <Flex ms="auto" w="max-content">
                        {endContent}
                    </Flex>
                </Flex>
            </Card>
        </ScaleFade>
    );
};

export default MiniStatistics;
