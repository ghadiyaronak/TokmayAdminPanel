import { useRef, useState } from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Stack,
    Flex,
    Text,
    FormLabel,
    FormControl,
    Switch
} from "@chakra-ui/react";

import useHelperHook from "../../hooks/useHelperHook";
import useAdminHook from "../../pages/protectedpages/manger/useAdminHook";

import { Formik, FormikProps } from "formik";
import { AxiosError } from "axios";
import { AdminProps } from "../../pages/protectedpages/manger/manager.types";

import CustomDivider from "../form/CustomDivider";
import ModalFooterComponent from "./ModalFooter";

interface IModalProps {
    isOpen: boolean;
    onClose: any;
    getAll: any;
    selectedData: AdminProps;
}

const UpdateAdminModal = ({ isOpen, onClose, getAll, selectedData }: IModalProps) => {
    const formRef = useRef<FormikProps<any>>(null);
    const { navigate, t, toast } = useHelperHook();
    const { updateAdmin } = useAdminHook();

    const onSubmit = async () => {
        const data = formRef?.current?.values;

        try {
            const result = await updateAdmin(selectedData?._id, data);
            formRef?.current?.resetForm();
            getAll();
            return toast({
                title: result,
                status: "success",
                duration: 3 * 1000,
                isClosable: true,
                position: "top-right"
            });
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    const handleClose = () => {
        onClose();
        formRef?.current?.resetForm();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>担当者を変更</ModalHeader>
                <CustomDivider />
                <ModalCloseButton />

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
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <ModalBody>
                                <Box>
                                    <Stack spacing={4}>
                                        <Flex flexDir={"column"}>
                                            <Text fontWeight={"bold"}>{String(t("担当者名"))} </Text>

                                            <Text>{selectedData?.userName ? selectedData?.userName : "-"}</Text>
                                        </Flex>

                                        <Flex flexDir={"column"}>
                                            <Text fontWeight={"bold"}>{String(t("login.email"))} </Text>
                                            <Text>{selectedData?.email}</Text>
                                        </Flex>

                                        <FormControl>
                                            <FormLabel fontWeight={"bold"}>{String(t("common.status"))}</FormLabel>

                                            <Switch
                                                mb={3}
                                                name="status"
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
                                    </Stack>
                                </Box>
                            </ModalBody>
                            <CustomDivider />

                            <ModalFooterComponent
                                handleClose={onClose}
                                handleDisabled={dirty && Object.keys(errors).length == 0 ? false : true}
                            />
                        </form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};

export default UpdateAdminModal;
