//services
import { Box, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordSchema } from "../../validations/login.validation";
import { useTranslation } from "react-i18next";
import { PASSWORD_VERIFICATION, RESET_PASSWORD } from "../../utils/url";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

//components
import AdminHeader from "../../components/header/AdminHeader";
import CustomPasswordField from "../../components/form/CustomePasswordField";
import LoginButton from "../../components/button/LoginButton";
import client from "../../apiConfig/client";

const ResetPasswordPages = () => {
    //state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //hooks
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { token } = useParams<string>();
    const toast = useToast();

    //api call
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
            if (result?.data?.data?.isNewUser) {
                navigate("/login");
                let errorTitle = "invalid link";
                toast({
                    title: errorTitle,
                    status: "success",
                    variant: "solid",
                    duration: 2000,
                    position: "top-right",
                    isClosable: true
                });
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
        setIsLoading(true);
        try {
            const result = await client.post(RESET_PASSWORD, values);

            toast({
                title: result.data?.messages,
                status: "success",
                variant: "solid",
                duration: 2000,
                position: "top-right",
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
    };
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
            token: token
        },
        validationSchema: ResetPasswordSchema(t),
        onSubmit
    });
    return (
        <Flex align="center" mt={5} flexDir={"column"}>
            <AdminHeader />

            <form autoComplete="off" onSubmit={handleSubmit}>
                <Box rounded="lg" bg={"white"} boxShadow="lg" p={8} width="md">
                    <Box rounded={"lg"} w={"full"} maxW={"md"}>
                        <Text fontWeight="bold" mb={4}>
                            {t("login.reset_password")}
                        </Text>
                        <Stack spacing={4}>
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
                                label={t("login.confirm_password")}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                isMandatory={true}
                            />

                            <Stack spacing={10}>
                                <LoginButton label={t("login.reset_password")} isSubmitting={isSubmitting} />
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </form>
        </Flex>
    );
};

export default ResetPasswordPages;
