//services
import { Flex, Box, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { ChangePasswordSchema } from "../../validations/login.validation";
import { AxiosError } from "axios";
import { CHANGE_PASSWORD } from "../../utils/url";

//components
import AdminHeader from "../../components/header/AdminHeader";
import CustomPasswordField from "../../components/form/CustomePasswordField";
import LoginButton from "../../components/button/LoginButton";
import client from "../../apiConfig/client";

const ChangePasswordPage = () => {
    //state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //hooks
    const { t } = useTranslation();
    const navigate = useNavigate();
    const toast = useToast();

    //api call
    const handleSubmit = async (values: any) => {
        try {
            const result = await client.patch(CHANGE_PASSWORD, values);
            toast({
                title: result?.data?.message,
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
    };
    return (
        <Flex align="center" mt={5} flexDir={"column"}>
            <AdminHeader />

            <Box rounded="lg" bg={"white"} boxShadow="lg" p={8} width="sm">
                <Formik
                    initialValues={{
                        old_password: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={ChangePasswordSchema(t)}
                    onSubmit={(values: any) => {
                        handleSubmit(values);
                    }}
                >
                    {({ handleBlur, handleChange, handleSubmit, errors, touched, values }: any) => (
                        <Box rounded={"lg"} as="form" onSubmit={handleSubmit} w={"full"} maxW={"md"}>
                            <Stack spacing={4}>
                                <CustomPasswordField
                                    label={"現在のパスワード"}
                                    name="old_password"
                                    value={values.old_password}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors.old_password}
                                    touched={touched.old_password}
                                    isMandatory={true}
                                />

                                <CustomPasswordField
                                    label={t("login.new_password")}
                                    name="password"
                                    value={values.password}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors.password}
                                    touched={touched.password}
                                    isMandatory={true}
                                />

                                <CustomPasswordField
                                    label={"新しいパスワード(再入力)"}
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                    isMandatory={true}
                                />

                                <Stack spacing={10}>
                                    <LoginButton label={t("login.change_password")} isSubmitting={isLoading} />
                                </Stack>
                            </Stack>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
};

export default ChangePasswordPage;
