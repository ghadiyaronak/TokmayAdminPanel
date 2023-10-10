// services
import { Box, Flex, Link, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "../../validations/login.validation";
import { ADMIN_AUTH } from "../../utils/url";
import { AxiosError } from "axios";
import { setCredentials } from "../../store/slices/authSlice";
import client from "../../apiConfig/client";

// hooks
import { useAppDispatch } from "../../store/hooks";

//components
import AdminHeader from "../../components/header/AdminHeader";
import CustomInputField from "../../components/form/CustomeInputLogin";
import CustomPasswordField from "../../components/form/CustomePasswordField";
import LoginButton from "../../components/button/LoginButton";

const LoginPage = () => {
    //state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //hooks
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const toast = useToast();

    //api call
    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const result = await client.post(ADMIN_AUTH, values);
            dispatch(setCredentials(result?.data?.data));
            navigate("/dashboard");
            toast({
                title: result.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
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

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: import.meta.env.VITE_APP_EMAIL ?? "",
            password: import.meta.env.VITE_APP_PASSWORD ?? ""
        },
        validationSchema: LoginSchema(t),
        onSubmit
    });

    return (
        <Flex align="center" mt={5} flexDir={"column"}>
            <AdminHeader />
            <Box rounded="lg" bg={"white"} boxShadow="lg" p={8} width="md">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Stack spacing={4}>
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

                        <Stack spacing={10}>
                            <Stack direction={{ base: "column", sm: "row" }} align="start" justify="space-between">
                                <Link
                                    color="blue.400"
                                    textDecoration="none"
                                    onClick={() => navigate("/forgot-password")}
                                >
                                    {t("login.forgot_password") + "?"}
                                </Link>
                            </Stack>
                        </Stack>

                        <Stack spacing={10}>
                            <LoginButton label={"login.login"} isSubmitting={isLoading} />
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
};

export default LoginPage;
