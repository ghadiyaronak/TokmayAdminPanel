import { AspectRatio, Box } from "@chakra-ui/react";

interface VideoCardProps {
    video: any;
}
const VideoCard = ({ video }: VideoCardProps) => {
    return (
        <AspectRatio maxW="560px" ratio={1}>
            <video
                style={{
                    width: "100%",
                    objectFit: "cover"
                }}
                src={video}
                controls
            />
        </AspectRatio>
    );
};
export default VideoCard;
