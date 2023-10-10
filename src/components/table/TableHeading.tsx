import React from "react";
import { Flex } from "@chakra-ui/react";

interface TableHeadingProps {
    heading: string;
}

const TableHeading = ({ heading }: TableHeadingProps) => {
    return <Flex fontWeight={"bold"}>{heading}</Flex>;
};

export default TableHeading;
