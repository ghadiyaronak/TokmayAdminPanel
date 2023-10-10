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
    status: any;
    isOpen: boolean;
    onClose: any;
    fetchData: any;
    getAll: any;
    selectedData: ProfessionProps;
}

const UpdateProfessionModal = ({ isOpen, onClose, getAll, selectedData, fetchData }: Profession) => {
    const { t, toast, navigate } = useHelperHook();
    const formRef = useRef<FormikProps<any>>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { updateProfession } = useProfessionHook();

    const handleClose = () => {
        onClose();
        formRef?.current?.resetForm();
    };
    const onSubmit = async () => {
        setIsLoading(true);
        const data = formRef?.current?.values;
        try {
            const result = await updateProfession(selectedData?._id, data);
            formRef?.current?.resetForm();
            getAll();
            toast({
                title: result,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
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
            setIsLoading(false);
            handleClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />

            <Formik
                initialValues={{
                    name: selectedData?.professionName,
                    status: selectedData?.professionStatus
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
                )}
            </Formik>
        </Modal>
    );
};

export default UpdateProfessionModal;
