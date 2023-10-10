import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    Box,
    Stack,
    Flex,
    Text,
    FormLabel,
    FormControl,
    Switch
} from "@chakra-ui/react";

// redux
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import CustomDivider from "../form/CustomDivider";
import DeleteModalFooter from "./DeleteModalFooter";

interface IModalProps {
    isOpen: boolean;
    onClose: any;
    handleDelete: any;
    modalHeading: string;
    modalMessage: string;
    isLoading: boolean;
}

const DeleteProfessionModal = ({
    isOpen,
    onClose,
    handleDelete,
    modalHeading,
    modalMessage,
    isLoading
}: IModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalHeading}</ModalHeader>
                <CustomDivider />
                <ModalCloseButton />
                <ModalBody>
                    {modalMessage} <br />
                    削除した情報は復元できません
                </ModalBody>
                <CustomDivider />

                <DeleteModalFooter handleClose={onClose} isLoading={isLoading} handleDelete={handleDelete} />
            </ModalContent>
        </Modal>
    );
};

export default DeleteProfessionModal;
