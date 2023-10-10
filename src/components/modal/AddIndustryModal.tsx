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
import { ADD_INDUSTRY } from "../../utils/url";
import {} from "../../validations/industryValidation";
import { AxiosError } from "axios";
import useIndustryHook from "../../pages/protectedpages/Industry/useIndustryHook";

interface IndustryAddModalProps {
    isOpen: any;
    onClose: any;
    fetchData: any;
}

const AddIndustryModal = ({ isOpen, onClose, fetchData }: IndustryAddModalProps) => {
    const { navigate, t, toast } = useHelperHook();
    const formRef = useRef<FormikProps<any>>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { getIndustry, selectedData, deleteIndustry, setSelectedData, setIndustryData, industryData } =
        useIndustryHook();

    const onSubmit = async () => {
        const data = formRef?.current?.values;

        try {
            const result = await client.post(ADD_INDUSTRY, values);
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
                name: ""
            },
            validationSchema: "",
            onSubmit
        });

    const handleClose = () => {
        onClose();
        resetForm();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <Formik
                initialValues={{
                    status: selectedData?.status ?? selectedData?.status
                }}
                enableReinitialize
                onSubmit={() => {
                    onSubmit();
                }}
                innerRef={formRef}
            >
                {({
                    handleSubmit,
                    errors,
                    touched,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    handleBlur,
                    dirty
                }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalContent>
                            <ModalHeader>Add Industry</ModalHeader>
                            <CustomDivider />
                            <ModalCloseButton />
                            <ModalBody>
                                <CustomInputField
                                    label={t("Industry")}
                                    name="Industry"
                                    Type="string"
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
                                    defaultChecked={selectedData?.status}
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
                                <Button color={"white"} bgColor={globalStyles.colors.button.danger} onClick={onClose}>
                                    クローズ
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                )}
            </Formik>
        </Modal>
    );
};

export default AddIndustryModal;
