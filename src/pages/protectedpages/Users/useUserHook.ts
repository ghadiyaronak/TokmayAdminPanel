import { useState } from "react";
import client from "../../../apiConfig/client";
import { GET_ALL_DOCUMENT, GET_ALL_USER, GET_ID_USER_USER } from "../../../utils/url";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { UserProps } from "./user.type";
import { useParams } from "react-router-dom";

const useUserHook = () => {
    const [userData, setUserData] = useState<UserProps[]>([]);
    const [idByuserData, setIdByuserDataData] = useState<UserProps[]>([]);
    const [updateData, setUpdateData] = useState<UserProps[]>([]);
    const [tableData, setTableData] = useState<UserProps[]>([]);
    const [disableReset, setDisableReset] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [modal, setModal] = useState<any>(false);
    const params = useParams();

    async function getAllUser(): Promise<UserProps[]> {
        try {
            const response = await client.get(GET_ALL_USER);
            const userData: UserProps[] = response.data?.data?.rows ?? [];
            return userData;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function getAllDocuments(): Promise<UserProps[]> {
        try {
            const response = await client.get(GET_ALL_DOCUMENT);
            const userDocument: UserProps[] = response.data?.data?.rows ?? [];
            return userDocument;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function getIdByUser(): Promise<any> {
        try {
            const response = await client.get(`/admin/user/details/${params.userId}`);
            const idByuserData: UserProps[] = response.data?.data ?? [];
            return idByuserData;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function updateUserStatus(status: any): Promise<any> {
        try {
            const response = await client.put(`/block/user/status/${params.userId}`, { userStatus: status });
            const updateStatus: UserProps[] = response.data?.data ?? [];
            return updateStatus;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function updateBlockUserStatus(userId: string, status: any): Promise<any> {
        try {
            const response = await client.put("/block/user/status/" + userId, {
                userStatus: status
            });

            const updateStatus: AxiosResponse = response.data;
            return updateStatus;
        } catch (error) {
            return error;
        }
    }

    return {
        getAllUser,
        setUserData,
        userData,
        getIdByUser,
        idByuserData,
        updateBlockUserStatus,
        setIdByuserDataData,
        updateUserStatus,
        setUpdateData,
        updateData,
        setTableData,
        tableData,
        disableReset,
        setDisableReset,
        isLoading,
        setIsLoading,
        modal,
        setModal,
        getAllDocuments
    };
};

export default useUserHook;
