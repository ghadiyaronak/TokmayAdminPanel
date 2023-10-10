//services
import { Box, Flex, Stack, useDisclosure, Image, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SetPasswordSchema } from "../../validations/login.validation";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { PASSWORD_VERIFICATION, SET_PASSWORD } from "../../utils/url";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

//components
import AdminHeader from "../../components/header/AdminHeader";
import MainLoader from "../../components/loader/MainLoader";
import CustomInputField from "../../components/form/CustomeInputLogin";
import CustomPasswordField from "../../components/form/CustomePasswordField";
import LoginButton from "../../components/button/LoginButton";
import UploadImageModal from "../../components/uploadImage/UploadImageModal";
import client from "../../apiConfig/client";

const SetPasswordPage = () => {
    //state
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<any | null>(null);

    //hooks
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { token }: any = useParams();
    const toast = useToast();

    // API for password token verification
    const VerifyPasswordToken = async () => {
        setIsLoading(true);
        try {
            if (!token) {
                toast({
                    title: "Invalid request",
                    status: "error",
                    variant: "solid",
                    duration: 2000,
                    position: "top-right",
                    isClosable: true
                });
                navigate("/login");
            }

            const result = await client.get(PASSWORD_VERIFICATION + String(token));
            setIsLoading(false);

            if (!result?.data?.data?.isNewUser) {
                // navigate("/login");
                // let errorTitle = "invalid link";
                // toast({
                //     title: errorTitle,
                //     status: "success",
                //     variant: "solid",
                //     duration: 2000,
                //     position: "top-right",
                //     isClosable: true
                // });
            }
        } catch (error: AxiosError | any) {
            setIsLoading(false);
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    useEffect(() => {
        VerifyPasswordToken();
    }, [token]);

    //api call
    const onSubmit = async (values: any) => {
        let formData = new FormData();

        formData.append("Profile_Image", values.Profile_Image);
        formData.append("userName", values.userName);
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);
        formData.append("token", token);
        setIsLoading(true);

        try {
            const result = await client.post(SET_PASSWORD, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate("/login");
        } catch (error: AxiosError | any) {
            setIsLoading(false);
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            Profile_Image: null,
            userName: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: SetPasswordSchema(t),
        onSubmit
    });
    const setImage = (imageFile: any) => {
        setFieldValue("Profile_Image", imageFile);
    };

    return (
        <Flex align="center" mt={5} flexDir={"column"}>
            <AdminHeader title={"プロフィール登録"} />
            {isLoading ? (
                <Flex minH={"100vh"} w="full" alignItems={"center"} justifyContent={"center"}>
                    <MainLoader />
                </Flex>
            ) : (
                <>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Box rounded="lg" bg={"white"} boxShadow="lg" p={8} width="md">
                            <Stack spacing={4}>
                                <Flex flex={1} flexDir={"column"}>
                                    <Box pos={"relative"} onClick={onOpen} w={"full"}>
                                        {imageUrl ? (
                                            <Box
                                                h={"36"}
                                                w={"36"}
                                                rounded={"full"}
                                                backgroundColor={"blackAlpha.50"}
                                                cursor={"pointer"}
                                                marginX={"auto"}
                                            >
                                                <Image src={imageUrl} h={"full"} rounded={"full"} objectFit={"cover"} />
                                            </Box>
                                        ) : (
                                            <Box
                                                h={"32"}
                                                w={"32"}
                                                border={"4px"}
                                                // borderStyle={"dashed"}
                                                borderColor={"blackAlpha.100"}
                                                backgroundColor={"blackAlpha.50"}
                                                cursor={"pointer"}
                                                rounded={"full"}
                                                marginX={"auto"}
                                            >
                                                <Image
                                                    src={"/assets/images/avatar.png"}
                                                    objectFit={"cover"}
                                                    h={"full"}
                                                    w={"full"}
                                                    rounded={"full"}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                    {errors.Profile_Image && touched.Profile_Image && (
                                        <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                            {errors.Profile_Image}
                                        </Text>
                                    )}
                                </Flex>
                                {errors.Profile_Image && touched.Profile_Image && (
                                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                        {errors.Profile_Image}
                                    </Text>
                                )}
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

                                <CustomPasswordField
                                    label={t("login.password")}
                                    name="password"
                                    value={values.password}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors.password}
                                    touched={touched.password}
                                    isMandatory={true}
                                />

                                <CustomPasswordField
                                    label={"パスワード(再入力)"}
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                    isMandatory={true}
                                />

                                <Stack spacing={10}>
                                    <LoginButton label={"login.login"} isSubmitting={isSubmitting} />
                                </Stack>
                            </Stack>
                        </Box>
                    </form>

                    <UploadImageModal
                        isOpen={isOpen}
                        onClose={onClose}
                        setImage={setImage}
                        setImageUrl={setImageUrl}
                        isRound={true}
                    />
                </>
            )}
        </Flex>
    );
};

export default SetPasswordPage;
