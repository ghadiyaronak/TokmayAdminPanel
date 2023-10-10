import { Text } from "@chakra-ui/react";

interface TableColumnProps {
    column: string;
}

const UserTable = ({ column }: TableColumnProps) => {
    return (
        <Text as={"span"} display={"flex"} justifyContent={"center"} alignItems={"center"} fontWeight={"500"}>
            {column ?? "--"}
        </Text>
    );
};

export default UserTable;
