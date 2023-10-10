import { AspectRatio, Box, Image, useDisclosure } from "@chakra-ui/react";
import ImageModal from "../modal/ImageModal";
import MediaImageModal from "../modal/MediaImageModal";

interface MediaImageCardProps {
    image: any;
}
export default function MediaImageCard({ image }: MediaImageCardProps) {
    const { isOpen: ImageIsOpen, onOpen: ImageOnOpen, onClose: ImageOnClose } = useDisclosure();

    return (
        <>
            <AspectRatio maxW="560px" ratio={1}>
                {/* <Image w={"full"} src={image} objectFit="cover" /> */}
                <Image
                    // h={"600px"}
                    w={"full"}
                    objectFit={"cover"}
                    cursor={"pointer"}
                    onClick={ImageOnOpen}
                    src={image}
                />
            </AspectRatio>
            <MediaImageModal isOpen={ImageIsOpen} onClose={ImageOnClose} image={image} />
        </>
    );
}
