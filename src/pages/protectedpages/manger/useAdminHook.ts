import React, { useState } from "react";
import client from "../../../apiConfig/client";
import { ADMIN_DELETE, GET_ALL_ADMIN, UPDATE_ADMIN } from "../../../utils/url";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";
import { AdminProps } from "./manager.types";

const useAdminHook = () => {
    const [adminData, setAdminData] = useState<AdminProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedData, setSelectedData] = useState<AdminProps>({
        createdAt: "",
        email: "",
        status: false,
        _id: ""
    });

    async function getAllManager(): Promise<AdminProps[]> {
        try {
            const response = await client.get(GET_ALL_ADMIN);
            const adminData: AdminProps[] = response.data?.data?.rows ?? [];
            return adminData;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function updateAdmin(id: string, adminData: AdminProps) {
        try {
            const response = await client.post("/admin/status-update/" + id, adminData);

            const createdAdmin = response?.data?.message;
            return createdAdmin;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function deleteAdmin(adminData: AdminProps) {
        try {
            const response = await client.delete(`${ADMIN_DELETE}/${adminData?._id}`);
            const createdAdmin = response?.data?.message;
            return createdAdmin;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    return {
        adminData,
        getAllManager,
        isLoading,
        setIsLoading,
        selectedData,
        setSelectedData,
        updateAdmin,
        deleteAdmin,
        setAdminData
    };
};

export default useAdminHook;
