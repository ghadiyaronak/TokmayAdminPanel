import React, { useState } from "react";
import client from "../../../apiConfig/client";
import { GET_ALL_BLOCK_USER } from "../../../utils/url";
import { AxiosError } from "axios";

const useBlockUserHook = () => {
    const [blockuserData, setBlockUserData] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isLoading, setIsLoading] = useState<any>(false);
    const [disableReset, setDisableReset] = useState<boolean>(true);
    const [tableData, setTableData] = useState<any[]>([]);

    async function getAllBlockUser(): Promise<any> {
        try {
            const response = await client.get(GET_ALL_BLOCK_USER);
            const blockuserData = response.data?.data?.rows ?? [];
            return blockuserData;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message;
            throw new Error(errorMessage);
        }
    }
    return {
        blockuserData,
        setBlockUserData,
        getAllBlockUser,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        setIsLoading,
        disableReset,
        setDisableReset,
        tableData,
        setTableData
    };
};

export default useBlockUserHook;
