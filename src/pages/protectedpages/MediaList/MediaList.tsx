// services
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { docExtensions, imageExtensions, videoExtensions } from "../../../utils/data";

// hooks

// components
import VideoCard from "../../../components/card/VideoCard";
import DocCard from "../../../components/card/DocCard";
import MediaImageCard from "../../../components/card/MediaImageCard";
import { useEffect, useState } from "react";
import useUserHook from "../Users/useUserHook";
import CustomLoader from "../../../components/loader/CustomLoader";

const MediaList = () => {
    // hooks
    const [isLoading, setIsLoading] = useState<any>(false);
    const { getAllDocuments } = useUserHook();
    const [tableData, setTableData] = useState<any>([]);

    // api call
    async function fetchData() {
        setIsLoading(true);
        try {
            const documents = await getAllDocuments();
            setTableData(documents);
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
        <div>
            {isLoading ? (
                <div>
                    <CustomLoader />
                </div>
            ) : (
                <Box w="100%" p={5}>
                    <SimpleGrid columns={4} spacing={6} my={5}>
                        {tableData?.map((data: any, index: number) => {
                            const item = data?.chatMedia?.url;

                            if (videoExtensions.some((ext) => item.endsWith(ext))) {
                                return <VideoCard video={item} key={item} />;
                            } else if (imageExtensions.some((ext) => item.endsWith(ext))) {
                                return <MediaImageCard image={item} key={item} />;
                            } else if (docExtensions.some((ext) => item.endsWith(ext))) {
                                return <DocCard name={data?.chatMedia?.name} doc={item} key={item} />;
                            } else {
                                return null;
                            }
                        })}
                    </SimpleGrid>
                </Box>
            )}
        </div>
    );
};

export default MediaList;
