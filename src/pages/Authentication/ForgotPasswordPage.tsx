// services
import { useState } from "react";
import { Flex, Box, Stack, Text, useToast, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { ForgotPasswordSchema } from "../../validations/login.validation";
import { AxiosError } from "axios";
import { FORGOT_PASSWORD_URL } from "../../utils/url";
import { useNavigate } from "react-router-dom";

//components
import LoginButton from "../../components/button/LoginButton";
import AdminHeader from "../../components/header/AdminHeader";
import CustomInputField from "../../components/form/CustomeInputLogin";
import MainLoader from "../../components/loader/MainLoader";
import client from "../../apiConfig/client";

interface IForm {
    email: string;
}

const ForgotPasswordPage = () => {
    //state
    const [form, setForm] = useState<IForm>({ email: "" });

    //hooks
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    // const handleSubmit = async () => {
    //     setIsLoading(true);
    //     try {
    //         const result = await client.post(FORGOT_PASSWORD_URL, values);
    //         console.log(result);
    //         navigate("/login");
    //     } catch (error: AxiosError | any) {
    //         setIsLoading(false);
    //         toast({
    //             title: error?.message,
    //             position: "top-right",
    //             status: "error",
    //             duration: 3000,
    //             isClosable: true
    //         });
    //     }
    // };

    return (
        <Flex align="center" mt={5} flexDir={"column"}>
            <AdminHeader />

            {isLoading ? (
                <Flex minH={"70vh"} w="full" alignItems={"center"} justifyContent={"center"}>
                    <MainLoader />
                </Flex>
            ) : (
                <Box rounded="lg" bg={"white"} boxShadow="lg" p={8} width="md">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            email: form.email
                        }}
                        validationSchema={ForgotPasswordSchema(t)}
                        onSubmit={async (values, { setSubmitting }) => {
                            setIsLoading(true);
                            try {
                                const result = await client.post(FORGOT_PASSWORD_URL, values);
                                toast({
                                    title: result.data?.message,
                                    position: "top-right",
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true
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
                            // handleSubmit();
                            setSubmitting(false);
                        }}
                    >
                        {({ handleBlur, handleChange, handleSubmit, errors, touched, values }: any) => (
                            <Box rounded={"lg"} as="form" onSubmit={handleSubmit} w={"full"} maxW={"md"}>
                                <Stack spacing={4}>
                                    <Text fontWeight="bold">{t("login.forgot_password")}?</Text>

                                    <Text
                                        fontSize={{ base: "sm", sm: "md" }}
                                        color={useColorModeValue("gray.800", "gray.400")}
                                    >
                                        {t("login.get_an_email")}
                                    </Text>

                                    <CustomInputField
                                        label={String(t("login.email"))}
                                        name="email"
                                        Type="email"
                                        values={values.email}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        errors={errors.email}
                                        touched={touched.email}
                                        isMandatory={true}
                                    />
                                    {/* </FormControl> */}

                                    <Stack spacing={6}>
                                        <Stack
                                            direction={{ base: "column", sm: "row" }}
                                            align="start"
                                            justify="space-between"
                                        >
                                            {/* <Link color="blue.400" textDecoration="none" onClick={() => navigate("/login")}>
                                    {t("login.back")}
                                </Link> */}
                                        </Stack>

                                        <LoginButton label={"login.request_reset"} />
                                    </Stack>
                                </Stack>
                            </Box>
                        )}
                    </Formik>
                </Box>
            )}
        </Flex>
    );
};

export default ForgotPasswordPage;
