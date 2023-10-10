import { Flex, Box, Stack, Text, useToast, Image, useDisclosure, FormLabel } from "@chakra-ui/react";
import MainLoader from "../../../components/loader/MainLoader";
import { useTranslation } from "react-i18next";
import ProfileHeader from "../../../components/header/ProfileHeader";
import CancelEditButton from "../../../components/button/CancleEditButton";
import CustomInputField from "../../../components/form/CustomeInputLogin";
import UserProfileSubmitButton from "../../../components/button/UserProfileSubmitButton";
import { useState, useEffect } from "react";
import UploadImageModal from "../../../components/uploadImage/UploadImageModal";
import { useFormik } from "formik";
import { ADMIN_PROFILE_UPDATE, GET_ADMIN_PROFILE } from "../../../utils/url";
import client from "../../../apiConfig/client";
import { AxiosError } from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AuthHeader from "../../../components/header/AuthHeader";
import { useAppDispatch } from "../../../store/hooks";
import { selectProfileImage } from "../../../store/slices/authSlice";
interface EditProps {
    handleModeChange: any;
    details: any;
}

const EditProfile = ({ handleModeChange, details }: EditProps) => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [imageUrl, setImageUrl] = useState<any | null>(null);

    const onSubmit = async () => {
        let formData = new FormData();

        formData.append("Profile_Image", values.Profile_Image);
        formData.append("userName", values.userName);
        try {
            await client.put(ADMIN_PROFILE_UPDATE, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            handleModeChange();
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } finally {
            setSubmitting(false);
        }
    };

    const {
        values,
        errors,
        touched,
        dirty,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setSubmitting
    } = useFormik({
        initialValues: {
            Profile_Image: details?.profileImage,
            userName: details?.userName
        },

        onSubmit
    });

    const setImage = (imageFile: any) => {
        setFieldValue("Profile_Image", imageFile);
    };

    return (
        <Box>
            <>
                <Flex align="center" mt={5} flexDir={"column"}>
                    <ProfileHeader title={t("login.edit_profile")} />
                    <Box rounded="lg" bg={"white"} boxShadow="lg" pt={8} width="sm" position={"relative"}>
                        <Stack spacing={4} flexDir={"column"}>
                            <Flex flex={1} flexDir={"column"}>
                                {/* <EditButton title={t("login.save")} handleModeChange={handleModeChange} /> */}
                                <CancelEditButton title={t("login.save")} setMode={handleModeChange} />
                                <Box
                                    pos={"relative"}
                                    onClick={onOpen}
                                    w={"full"}
                                    h={"160"}
                                    display={"flex"}
                                    alignItems={"center"}
                                >
                                    {imageUrl ? (
                                        <>
                                            <Box
                                                mt={4}
                                                h={"36"}
                                                w={"36"}
                                                border={"4px"}
                                                borderColor={"blackAlpha.100"}
                                                backgroundColor={"blackAlpha.50"}
                                                cursor={"pointer"}
                                                rounded={"full"}
                                                marginX={"auto"}
                                            >
                                                <Image
                                                    src={imageUrl}
                                                    objectFit={"cover"}
                                                    h={"full"}
                                                    w={"full"}
                                                    rounded={"full"}
                                                />
                                            </Box>
                                        </>
                                    ) : (
                                        <Box
                                            mt={4}
                                            h={"36"}
                                            w={"36"}
                                            border={"4px"}
                                            // borderStyle={"dashed"}
                                            borderColor={"blackAlpha.100"}
                                            backgroundColor={"blackAlpha.50"}
                                            cursor={"pointer"}
                                            rounded={"full"}
                                            marginX={"auto"}
                                        >
                                            <Image
                                                src={
                                                    details?.profileImage
                                                        ? details?.profileImage
                                                        : "/assets/images/avatar.png"
                                                }
                                                objectFit={"cover"}
                                                h={"full"}
                                                w={"full"}
                                                rounded={"full"}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Flex>

                            <form onSubmit={handleSubmit}>
                                <Box py={6}>
                                    <Box px={6}>
                                        <CustomInputField
                                            label={"担当者名"}
                                            name="userName"
                                            values={values.userName}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errors={errors.userName}
                                            touched={touched.userName}
                                            isMandatory={false}
                                            Type="text"
                                        />

                                        <Stack mt={"8"} alignItems={"center"}>
                                            <UserProfileSubmitButton
                                                title={"登録"}
                                                handleDisabled={dirty && Object.keys(errors).length == 0 ? false : true}
                                                isLoading={isSubmitting}
                                            />
                                        </Stack>
                                    </Box>
                                </Box>
                            </form>
                        </Stack>
                    </Box>
                </Flex>
                <UploadImageModal
                    isOpen={isOpen}
                    onClose={onClose}
                    setImage={setImage}
                    setImageUrl={setImageUrl}
                    isRound={true}
                />
            </>
        </Box>
    );
};

export default EditProfile;
