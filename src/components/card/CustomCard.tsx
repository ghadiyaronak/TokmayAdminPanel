"use client";
//services & hooks
import { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import ImageCard from "./ImageCard";
import CustomLoader from "../loader/CustomLoader";
import useUserHook from "../../pages/protectedpages/Users/useUserHook";

const CustomCard = () => {
    // hooks
    const { setUserData, getIdByUser } = useUserHook();
    const [isLoading, setIsLoading] = useState<any>(false);
    const [tableData, setTableData] = useState<any>([]);

    // api call
    async function fetchData() {
        setIsLoading(true);
        try {
            const idByuserData = await getIdByUser();
            setUserData(idByuserData);
            setTableData(idByuserData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div>
                    <CustomLoader />
                </div>
            ) : (
                <Box w="full" mt={5}>
                    <Grid templateColumns="repeat(5, 1fr)" gap={6} my={5}>
                        {tableData?.coverImage?.length > 0 &&
                            tableData?.coverImage?.map((url: string, index: number) => {
                                return (
                                    <>
                                        <GridItem w="100%" key={index}>
                                            <ImageCard image={url} />
                                        </GridItem>
                                    </>
                                );
                            })}
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default CustomCard;
