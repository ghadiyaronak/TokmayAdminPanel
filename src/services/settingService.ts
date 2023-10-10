import axios, { AxiosResponse } from "axios";
import { GET_ALL_SETTING } from "../utils/url";
import client from "../apiConfig/client";

const settingService = {
    getAll: async (): Promise<any> => {
        const response: AxiosResponse<any> = await client.get(GET_ALL_SETTING + "?email=true&matching=true");
        return response.data;
    }
};

export default settingService;
