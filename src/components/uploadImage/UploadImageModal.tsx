import { useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    Flex,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    useToast
} from "@chakra-ui/react";

// croping
import { getOrientation } from "get-orientation";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { getCroppedImg, getRotatedImage, readFile, urlToFile } from "./CanvasUtils";

import { useTranslation } from "react-i18next";
import { globalStyles } from "../theme/styles";

// icons
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import { UploadIcon } from "./icons";
import CancelButton from "../button/CancleButton";

const ORIENTATION_TO_ANGLE: any = {
    "3": 180,
    "6": 90,
    "8": -90
};

interface UploadImageProps {
    isOpen: any;
    onClose: any;
    setImage: any;
    setImageUrl: any;
    isRound?: boolean;
}

const UploadImageModal = ({ isOpen, onClose, setImage, setImageUrl, isRound }: UploadImageProps) => {
    const [imageSrc, setImageSrc] = useState<any | null>(null);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const toast = useToast();
    const { t } = useTranslation();

    const onDrop = useCallback(async (acceptedFiles: any) => {
        if (acceptedFiles && acceptedFiles.length < 0) {
            return;
        }

        const file = acceptedFiles[0];
        const fileRestriction = file?.size / (1024 * 1024) > 30;

        if (fileRestriction) {
            return toast({
                title: t("assets.photo_warning"),
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right"
            });
        }

        let imageDataUrl: any = await readFile(file);
        try {
            const orientation: any = await getOrientation(file);
            const rotation = ORIENTATION_TO_ANGLE[orientation];
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
            }
        } catch (e) {
            console.warn("failed to detect the orientation");
        }
        setImageSrc(imageDataUrl);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    useEffect(() => {
        if (!isOpen) {
            setImageSrc(null);
        }
    }, [isOpen]);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage: any = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
            const imageFile = urlToFile(croppedImage);
            setImage(imageFile);
            onClose();
            setImageUrl(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, rotation]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("assets.upload_image")}</ModalHeader>
                <ModalCloseButton />

                {!imageSrc ? (
                    <ModalBody>
                        <Box
                            {...getRootProps()}
                            bgColor={"blackAlpha.50"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Box
                                border={isDragActive ? "1px" : ""}
                                borderStyle={isDragActive ? "dashed" : ""}
                                minH={"50vh"}
                                w={"full"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <input {...getInputProps()} accept="image/png, image/jpeg" />

                                {isDragActive ? (
                                    <Text fontWeight={"bold"} textAlign={"center"} fontSize={"3xl"}>
                                        {t("assets.uploading")}
                                    </Text>
                                ) : (
                                    <Flex
                                        flexDir={"column"}
                                        gap={3}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        padding="20"
                                    >
                                        <UploadIcon boxSize={"14"} />

                                        <Text fontWeight={"bold"} textAlign={"center"} fontSize={"3xl"}>
                                            {t("assets.add_a_photo")}
                                        </Text>

                                        <Text textAlign={"center"}> {t("assets.drag_And_drop")}</Text>

                                        <Text mt={7} textAlign={"center"}>
                                            {t("assets.photo_warning")}
                                        </Text>
                                    </Flex>
                                )}
                            </Box>
                        </Box>
                    </ModalBody>
                ) : (
                    <>
                        <ModalBody position={"relative"}>
                            <>
                                <Box className="cropContainer">
                                    <Cropper
                                        image={imageSrc}
                                        crop={crop}
                                        rotation={rotation}
                                        zoom={zoom}
                                        aspect={isRound && isRound ? 1 : 16 / 9}
                                        cropShape={isRound ? "round" : "rect"}
                                        onCropChange={setCrop}
                                        onRotationChange={setRotation}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                    />
                                </Box>
                            </>
                            {/* <Text>ズーム</Text> */}

                            <Flex alignItems={"center"} my={3}>
                                <Icon as={BiZoomOut} boxSize={"7"} />
                                <Slider
                                    aria-label="slider-ex-1"
                                    defaultValue={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    // classes={{ root: classes.slider }}
                                    onChange={(zoom) => setZoom(Number(zoom))}
                                >
                                    <SliderTrack bg={"blackAlpha.400"}>
                                        <SliderFilledTrack bg={globalStyles.colors.mainColor} />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                                <Icon as={BiZoomIn} boxSize={"7"} />
                            </Flex>
                        </ModalBody>

                        <Text mx={7} textAlign={"center"}>
                            {t("assets.photo_warning")}
                        </Text>

                        <ModalFooter display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <CancelButton handleClick={onClose} />

                            <Button colorScheme={"green"} ml={3} onClick={showCroppedImage} size={"sm"} rounded={"md"}>
                                {t("assets.save_photo")}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UploadImageModal;
