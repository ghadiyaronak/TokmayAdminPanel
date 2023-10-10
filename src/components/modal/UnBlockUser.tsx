import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Box,
    Text,
    FormControl,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../theme/styles";
import { useTranslation } from "react-i18next";
import useUserHook from "../../pages/protectedpages/Users/useUserHook";
import { AdminProps } from "../../pages/protectedpages/manger/manager.types";

interface IModalProps {
    isOpen: boolean;
    onClose: any;
    getAll: any;
}

const UnBlockUser = ({ isOpen, onClose, getAll }: IModalProps) => {
    const { t } = useTranslation();
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [tableData, setTableData] = useState<any>([]);
    const { setUserData, updateUserStatus, setUpdateData, updateData, getIdByUser, setIsLoading, isLoading, setModal } =
        useUserHook();
    // const [isLoading, setIsLoading] = useState(false);
    const [scrollTop, setScrollTop] = useState<boolean>(false);

    const handleUpdateStatus = async () => {
        setIsLoading(true);

        try {
            const updateData = await updateUserStatus(tableData?.userStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE");
            setUpdateData(updateData);
            setTableData(updateData);
            onClose();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("ユーザーのブロック解除")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <FormControl gap={10} display="flex" justifyContent={"center"} mt={5}>
                                {tableData?.userStatus === "BLOCK" ? (
                                    <Text>{""}</Text>
                                ) : (
                                    <Text>{t("このユーザーをブロック解除してもよろしいですか")}</Text>
                                )}
                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Box w={"full"} display="flex" justifyContent={"center"} onClick={() => setModal(false)}>
                            <Button
                                bgColor={globalStyles.colors.mainColor}
                                _hover={{ bgColor: "blue.300" }}
                                isLoading={isLoading}
                                onClick={() => {
                                    setScrollTop(true);
                                    handleUpdateStatus();
                                }}
                                color={"white"}
                                mr={3}
                            >
                                {t("common.yes")}
                            </Button>
                            <Button
                                bgColor={"red.500"}
                                _hover={{ bgColor: "red.300" }}
                                color={"white"}
                                onClick={() => {
                                    setScrollTop(true);
                                    onClose();
                                }}
                            >
                                {t("common.no")}
                            </Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UnBlockUser;
