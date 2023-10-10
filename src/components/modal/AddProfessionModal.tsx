import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import CustomDivider from "../form/CustomDivider";
import CustomInputField from "../form/CustomeInputLogin";
import useHelperHook from "../../hooks/useHelperHook";
import { globalStyles } from "../../theme/styles";
import { Formik, FormikProps, useFormik } from "formik";
import client from "../../apiConfig/client";
import { ADD_INDUSTRY, ADD_PROFESSION } from "../../utils/url";
import { AddProfessionSchema } from "../../validations/industryValidation";
import { AxiosError } from "axios";
import useIndustryHook from "../../pages/protectedpages/Industry/useIndustryHook";

interface IndustryAddModalProps {
    isOpen: any;
    onClose: any;
    fetchData: any;
}

const AddProfessionModal = ({ isOpen, onClose, fetchData }: IndustryAddModalProps) => {
    const { navigate, t, toast } = useHelperHook();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            const result = await client.post(ADD_PROFESSION, values);
            toast({
                title: result?.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            resetForm();
            fetchData();
            setIsLoading(false);
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });

            setIsLoading(false);
        } finally {
            handleClose();
        }
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
        handleBlur,
        dirty,
        handleChange,
        handleSubmit,
        resetForm
    } = useFormik({
        initialValues: {
            name: "",
            status: true
        },
        validationSchema: AddProfessionSchema(t),
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
                    <ModalHeader>職業を追加</ModalHeader>
                    <CustomDivider />
                    <ModalCloseButton />
                    <ModalBody>
                        <CustomInputField
                            label={t("名前")}
                            name="name"
                            Type="string"
                            values={values.name}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.name}
                            touched={touched.name}
                            isMandatory={true}
                        />
                    </ModalBody>
                    <FormControl>
                        <FormLabel px={"5"} fontWeight={"bold"}>
                            {String(t("common.status"))}
                        </FormLabel>

                        <Switch
                            mb={3}
                            name="status"
                            px={"5"}
                            defaultChecked={values.status}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setFieldValue("status", true);
                                } else {
                                    setFieldValue("status", false);
                                }
                            }}
                        />
                    </FormControl>
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

export default AddProfessionModal;
