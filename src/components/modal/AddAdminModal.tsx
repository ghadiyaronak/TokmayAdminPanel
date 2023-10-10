import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { AddAdminSchema } from "../../validations/adminValidation";
import CustomDivider from "../form/CustomDivider";
import client from "../../apiConfig/client";
import CustomInputField from "../form/CustomeInputLogin";
import { useState } from "react";
import { ADD_ADMIN } from "../../utils/url";
import { AxiosError } from "axios";
import { globalStyles } from "../theme/styles";
import useHelperHook from "../../hooks/useHelperHook";
interface AdminAddModalProps {
    isOpen: any;
    onClose: any;
    fetchData: any;
}

const AddAdminModal = ({ isOpen, onClose, fetchData }: AdminAddModalProps) => {
    const { navigate, t, toast } = useHelperHook();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            const result = await client.post(ADD_ADMIN, values);
            toast({
                title: result?.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            resetForm();
            fetchData();
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };
    const { values, errors, touched, isSubmitting, handleBlur, dirty, handleChange, handleSubmit, resetForm } =
        useFormik({
            initialValues: {
                email: ""
            },
            validationSchema: AddAdminSchema(t),
            onSubmit
        });

    const handleClose = () => {
        onClose();
        resetForm();
    };
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <form onSubmit={handleSubmit}>
                <ModalContent>
                    <ModalHeader>担当者を追加</ModalHeader>
                    <CustomDivider />
                    <ModalCloseButton />
                    <ModalBody>
                        <CustomInputField
                            label={t("login.email")}
                            name="email"
                            Type="email"
                            values={values.email}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.email}
                            touched={touched.email}
                            isMandatory={true}
                        />
                    </ModalBody>
                    <CustomDivider />

                    <ModalFooter>
                        <Button
                            variant="solid"
                            isLoading={isLoading}
                            color={"white"}
                            bgColor={globalStyles.colors.mainColor}
                            type="submit"
                            mr={3}
                        >
                            保存
                        </Button>
                        <Button rounded={"md"} bgColor={"#A3A3A3"} color={"#ffffff"} onClick={handleClose}>
                            {t("common.cancel")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddAdminModal;
