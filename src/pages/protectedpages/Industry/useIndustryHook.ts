import { useState } from "react";
import client from "../../../apiConfig/client";
import { IndustryProps } from "./IndustryType";
import { DELETE_INDUSTRY, GET_ALLINDUSTRY } from "../../../utils/url";
import { AxiosError } from "axios";

const useIndustryHook = () => {
    const [industryData, setIndustryData] = useState<IndustryProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<IndustryProps>({
        name: "",
        count: "",
        status: false,
        _id: ""
    });

    async function getIndustry(): Promise<IndustryProps[]> {
        try {
            const response = await client.get(GET_ALLINDUSTRY);
            const industryData: IndustryProps[] = response.data?.data?.rows ?? [];
            return industryData;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    async function deleteIndustry(industryData: IndustryProps) {
        try {
            const response = await client.delete(`${DELETE_INDUSTRY}/${industryData}`);
            const createdAdmin = response?.data?.message;
            return createdAdmin;
        } catch (error: AxiosError | any) {
            const errorMessage = error?.message || "An error occurred";
            throw new Error(errorMessage);
        }
    }

    return {
        getIndustry,
        setIndustryData,
        industryData,
        setSelectedData,
        selectedData,
        deleteIndustry
    };
};

export default useIndustryHook;
