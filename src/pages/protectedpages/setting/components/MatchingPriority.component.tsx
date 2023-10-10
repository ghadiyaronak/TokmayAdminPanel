// services
import { useState } from "react";
import { Box, Button, Table, Tbody, Td, Text } from "@chakra-ui/react";
import { globalStyles } from "../../../../theme/styles";
import MatchingPriorityDNDForm from "./MatchingPriority.DNDForm";
import { matchingTypes } from "./matching.types";
import client from "../../../../apiConfig/client";
import { UPDATE_SETTINGS } from "../../../../utils/url";
import { AxiosError } from "axios";

// hooks
import useHelperHook from "../../../../hooks/useHelperHook";

// components
import SkeletonCard from "../../../../components/skeleton/SkeletonCard";

// type declare
interface Props {
    matchings: matchingTypes[];
}

const MatchingPriority = ({ matchings }: Props) => {
    // hooks
    const { t, toast } = useHelperHook();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [items, setItems] = useState<matchingTypes[]>(matchings);

    const handleEditMode = () => {
        if (!isEditMode) {
            setIsEditMode(true);
            return;
        } else {
            handleMatching();
        }
    };

    // Matching Priority
    const handleMatching = async () => {
        setIsLoading(true);
        let fResult = items.map((item: matchingTypes) => item.text);
        try {
            const result = await client.put(UPDATE_SETTINGS, { matching: fResult });
            toast({
                title: result?.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            setItems(matchings);
        } finally {
            setIsLoading(false);
            setIsEditMode(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <SkeletonCard />
            ) : (
                <Box bgColor={"white"} p={4} rounded={"lg"} mt={2} position={"relative"}>
                    <Text display={"flex"} fontWeight={"bold"} mb={3}>
                        {t("マッチング優先順位")}
                    </Text>
                    <Box>
                        <Table w={"full"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Tbody>
                                <Td display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    {isEditMode ? (
                                        <MatchingPriorityDNDForm items={items} setItems={setItems} />
                                    ) : (
                                        <>
                                            <Box>
                                                {items.map((result: matchingTypes) => (
                                                    <>
                                                        <Td
                                                            minWidth={"28rem"}
                                                            display={"flex"}
                                                            justifyContent={"center"}
                                                            alignItems={"center"}
                                                            border={"1px solid gray"}
                                                        >
                                                            {result.text}
                                                        </Td>
                                                    </>
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                </Td>
                            </Tbody>
                        </Table>
                    </Box>
                    <Box display={"flex"} justifyContent={"flex-end"}>
                        <Button
                            type="submit"
                            color={"white"}
                            bgColor={globalStyles.colors.mainColor}
                            onClick={handleEditMode}
                        >
                            更新
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default MatchingPriority;
