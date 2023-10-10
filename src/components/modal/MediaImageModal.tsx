import {
    Img,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: any;
}

const MediaImageModal = ({ isOpen, onClose, image }: ImageModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader>Image Card</ModalHeader> */}
                <ModalCloseButton />
                <ModalBody mt={10}>
                    {image && (
                        <Img
                            // h={"full"}
                            // maxH={"600px"}
                            w={"250px"}
                            // objectFit={"cover"}
                            src={image}
                            mx={"auto"}
                        />
                    )}
                </ModalBody>

                {/* <ModalFooter>hiiie</ModalFooter> */}
            </ModalContent>
        </Modal>
    );
};

export default MediaImageModal;
