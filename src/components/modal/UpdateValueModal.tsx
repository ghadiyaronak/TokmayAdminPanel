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
    Switch,
    Text
} from "@chakra-ui/react";
import { Formik, FormikProps, useFormik } from "formik";
import { AddProfessionSchema } from "../../validations/industryValidation";
import CustomDivider from "../form/CustomDivider";
import CustomInputField from "../form/CustomeInputLogin";
import useHelperHook from "../../hooks/useHelperHook";
import { useRef, useState } from "react";
import { globalStyles } from "../../theme/styles";
import client from "../../apiConfig/client";
import { UPDATE_PROFESSION } from "../../utils/url";
import { AxiosError } from "axios";
import useProfession from "../../pages/protectedpages/profession/useProfessionHook";
import useProfessionHook from "../../pages/protectedpages/profession/useProfessionHook";
import { ProfessionProps } from "../../pages/protectedpages/profession/ProfessionTypes";

interface Profession {
    isOpen: boolean;
    onClose: any;
    onOpen: any;
    fetchData: any;
    getAll: any;
}

const UpdateValueModal = ({ isOpen, onOpen, onClose, getAll }: Profession) => {
    const { t, toast, navigate } = useHelperHook();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClose = () => {
        onClose();
    };
    const onSubmit = async () => {
        setIsLoading(true);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />

            <Formik
                initialValues={{
                    dataRemoveTime: ""
                }}
                enableReinitialize
                onSubmit={() => {
                    onSubmit();
                }}
            >
                {({
                    handleSubmit,
                    errors,
                    touched,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    resetForm,
                    handleBlur,
                    dirty
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <ModalContent>
                            <ModalHeader>職業を編集</ModalHeader>
                            <CustomDivider />
                            <ModalCloseButton />
                            <ModalBody>
                                <CustomInputField
                                    label={t("dataRemoveTime")}
                                    name="dataRemoveTime"
                                    Type="string"
                                    values={getAll?.data?.dataRemoveTime}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors.dataRemoveTime}
                                    touched={touched.dataRemoveTime}
                                    isMandatory={true}
                                />
                                {/* <Text>{getAll?.data?.dataRemoveTime}</Text> */}
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

export default UpdateValueModal;
