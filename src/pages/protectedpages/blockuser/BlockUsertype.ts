import React, { useState } from "react";
import client from "../../../apiConfig/client";
import { GET_ALL_BLOCK_USER } from "../../../utils/url";
import { AxiosError } from "axios";

const BlockUsertype = () => {
    const [blockuserData, setBlockUserData] = useState<any[]>([]);

    async function getAllBlockUser() {
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
        getAllBlockUser
    };
};

export default BlockUsertype;
