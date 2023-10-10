import { AspectRatio, Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import { Document, Page } from "react-pdf";

interface DocCardProps {
    doc: any;
    name: string;
}

const DocCard = ({ doc, name }: DocCardProps) => {
    const handleDownload = () => {
        const documentLink = doc; // This might be the link, not the filename
        const link = document.createElement("a");
        link.href = documentLink;
        // Extract the filename from the document link or use a default name
        const filename = documentLink.substring(documentLink.lastIndexOf("/"));
        link.download = filename;
        link.click();
    };

    return (
        <Flex
            maxW="560px"
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            bgColor={"gray.200"}
            rounded={"md"}
            p={4}
            h={"full"}
            gap={3}
            cursor={"pointer"}
        >
            <Image src="./doc.svg" />
            <Text fontWeight={"500"} fontSize="xl" textAlign={"center"}>
                {name}
            </Text>
            <Box onClick={handleDownload} display={"flex"} justifyContent={"flex-end"} style={{ cursor: "pointer" }}>
                <FaDownload size={20} style={{ marginRight: "8px" }} />
            </Box>
        </Flex>
    );
};

export default DocCard;

{
    /* <VStack h={"full"} w={"full"} spacing={2} align="stretch">
<Box
    bg={"#b0c3dd80"}
    borderWidth="1px"
    cursor={"pointer"}
    h={"full"}
    w={"full"}
    borderRadius="lg"
    p={2}
    _hover={{ bg: "gray.100" }}
    transition="background 0.3s"
>
   
</Box>
<Box
    display={"flex"}
    justifyContent={"flex-end"}

    style={{ cursor: "pointer" }}
>
    <FaDownload size={20} style={{ marginRight: "8px" }} />
</Box>
</VStack> */
}
