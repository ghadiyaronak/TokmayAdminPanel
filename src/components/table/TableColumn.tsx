import { Text } from "@chakra-ui/react";

interface TableColumnProps {
    column: string;
    handleClick?: () => void;
}

const TableColumn = ({ column, handleClick }: TableColumnProps) => {
    return (
        <Text as={"span"} fontWeight={"500"} cursor={"pointer"} onClick={handleClick}>
            {column ?? "--"}
        </Text>
    );
};

export default TableColumn;
