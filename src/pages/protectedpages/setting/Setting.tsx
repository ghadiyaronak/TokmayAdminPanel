// services
import { Box, Button, Flex, Input, Table, Tbody, Td, Text, Th, Thead, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UPDATE_SETTINGS } from "../../../utils/url";
import { useFormik } from "formik";
import { globalStyles } from "../../../theme/styles";
import { AddAdminSchema } from "../../../validations/adminValidation";
import { AxiosError } from "axios";
import client from "../../../apiConfig/client";
import settingService from "../../../services/settingService";

// hooks
import useHelperHook from "../../../hooks/useHelperHook";

// components
import MainHeading from "../../../components/header/MainHeading";
import CustomNumberField from "../../../components/form/CustomeNumberFiels";
import MatchingPriority from "./components/MatchingPriority.component";
import CustomLoader from "../../../components/loader/CustomLoader";
import { matchingTypes } from "./components/matching.types";
import SkeletonCard from "../../../components/skeleton/SkeletonCard";

// type declare
export interface optionTypes {
    label: string;
    value: string;
}

const Setting = () => {
    // hooks
    const { t, toast } = useHelperHook();
    const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
    const [isTimeLoading, setIsTimeLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [settingData, setSettingData] = useState<any>({});
    const [deleteEmail, setDeleteEmail] = useState<any>();
    const [matchings, setMatchings] = useState<matchingTypes[]>([]);

    // api call
    const getAll = async () => {
        setIsMatchingLoading(true);
        try {
            const { data } = await settingService.getAll();

            setSettingData(data);

            setFieldValue("freeMatch", data?.freeMatch);
            // setFieldValue("contactUsMail", data?.contactUsMail);

            setFieldValue("dataRemoveTime", data?.dataRemoveTime);

            const matchings: matchingTypes[] = [];

            data.matching &&
                data.matching.length > 0 &&
                data.matching.map((result: string) => {
                    matchings.push({
                        text: result,
                        id: result
                    });
                });

            setMatchings(matchings);
            setIsMatchingLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // Add email
    const onSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            const result = await client.put(UPDATE_SETTINGS, { email: values.email });
            toast({
                title: result?.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            getAll();
            resetForm();
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
        }
    };

    // Free Time Matching
    const handleSearchSubmit = async (e: any) => {
        e.preventDefault();
        setIsAddLoading(true);
        try {
            const result = await client.put(UPDATE_SETTINGS, { freeMatch: values?.freeMatch });
            toast({
                title: result?.data?.message,
                position: "top-right",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            getAll();
            setIsAddLoading(false);
        } catch (error: AxiosError | any) {
            toast({
                title: error?.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            setIsAddLoading(false);
        }
    };

    // TimeUpdate
    // const handleSearchTimeSubmit = async (e: any) => {
    //     setIsTimeLoading(true);
    //     e.preventDefault();
    //     try {
    //         const result = await client.put(UPDATE_SETTINGS, { time: values?.dataRemoveTime });
    //         toast({
    //             title: result?.data?.message,
    //             position: "top-right",
    //             status: "success",
    //             duration: 3000,
    //             isClosable: true
    //         });
    //         getAll();
    //         setIsTimeLoading(false);
    //     } catch (error: AxiosError | any) {
    //         toast({
    //             title: error?.message,
    //             position: "top-right",
    //             status: "error",
    //             duration: 3000,
    //             isClosable: true
    //         });
    //         setIsTimeLoading(false);
    //     }
    // };

    const { values, errors, touched, handleBlur, handleChange, setFieldValue, setFieldTouched, resetForm } = useFormik({
        initialValues: {
            email: "",
            freeMatch: "",
            contactUsMail: [],
            emailDelete: deleteEmail,
            dataRemoveTime: ""
        },
        validationSchema: AddAdminSchema(t),
        onSubmit
    });

    useEffect(() => {
        getAll();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const [isMatchingLoading, setIsMatchingLoading] = useState<boolean>(false);

    return (
        <>
            <Flex display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <MainHeading title={t("設定")} />
            </Flex>

            {isMatchingLoading ? <SkeletonCard /> : <MatchingPriority matchings={matchings} />}

            <Box bgColor={"white"} p={4} pb={1} rounded={"lg"} my={2} mt={2}>
                <Text display={"flex"} fontWeight={"bold"}>
                    画像、動画保存期限: 24 時間オート削除
                </Text>

                {/* <form onSubmit={handleSearchTimeSubmit}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bgColor={"white"}
                        rounded={"lg"}
                        position={"relative"}
                    >
                        <Flex gap={5} w={"64"}>
                            <CustomNumberField
                                name="dataRemoveTime"
                                Type="number"
                                values={values.dataRemoveTime}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.dataRemoveTime}
                                touched={touched.dataRemoveTime}
                            />
                            <Text py={4}>時間オート削除</Text>
                        </Flex>
                        <Box display={"flex"} justifyContent={"flex-end"} position={"absolute"} right={"0"}>
                            <Button type="submit" color={"white"} bgColor={globalStyles.colors.mainColor}>
                                更新
                            </Button>
                        </Box>
                    </Box>
                </form> */}
            </Box>

            <Box bgColor={"white"} p={4} pb={1} rounded={"lg"} my={2} mt={2}>
                <Text display={"flex"} fontWeight={"bold"}>
                    {t("無料マッチング回数: ")}
                </Text>

                <form onSubmit={handleSearchSubmit}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bgColor={"white"}
                        rounded={"lg"}
                        position={"relative"}
                    >
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Flex w={64} gap={5}>
                                <Box>
                                    <CustomNumberField
                                        name="freeMatch"
                                        Type="number"
                                        values={values.freeMatch}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        errors={errors.freeMatch}
                                        touched={touched.freeMatch}
                                    />
                                </Box>
                                <Text py={4}>回</Text>
                            </Flex>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"flex-end"}
                            position={"absolute"}
                            right={"0"}
                            bottom={"2"}
                        >
                            <Button
                                type="submit"
                                color={"white"}
                                bgColor={globalStyles.colors.mainColor}
                                // isLoading={isTimeLoading}
                            >
                                更新
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default Setting;
