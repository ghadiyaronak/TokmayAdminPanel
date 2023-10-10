import { setCredentials, resetState } from "../store/slices/authSlice";
import client from "./client";
import axios from "axios";
import { BASE_URL } from "../utils/environments";

let isRefreshTokenUpdating = false;

export default function addAuthTokenInterceptor(store) {
    client.interceptors.request.use((req) => {
        const token = store.getState().auth.token;
        if (!token) return req;
        req.headers.Authorization = `Bearer ${token}`;
        return req;
    });

    client.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalConfig = error?.config;
            const refreshToken = store.getState().auth.refreshToken;
            const token = store.getState().auth.token;
            // originalConfig._retry = true;

            if (error.response) {
                console.log(error);
                if (
                    !isRefreshTokenUpdating &&
                    refreshToken &&
                    error?.response?.status === 406 &&
                    !originalConfig._retry
                ) {
                    // If user login and have refresh token
                    isRefreshTokenUpdating = true;
                    originalConfig._retry = true;

                    //console.log({ originalConfig });

                    try {
                        const data = JSON.stringify({
                            refresh_token: refreshToken
                        });

                        let config = {
                            method: "post",
                            maxBodyLength: Infinity,
                            url: `${BASE_URL}/admin/auth/generate/access-token`,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: data
                        };

                        const result = await axios.request(config);
                        //console.log({ result });
                        isRefreshTokenUpdating = false;
                        store.dispatch(setCredentials(result.data.data));
                        return client(originalConfig);
                    } catch (error) {
                        isRefreshTokenUpdating = false;
                        store.dispatch(resetState());
                        return (window.location = "/login");
                    }
                } else if (isRefreshTokenUpdating) {
                    // If refresh token is updating
                    await isRefreshTokenDone();
                    //console.log("isRefreshTokenUpdating");
                    return client(originalConfig);
                } else {
                    return Promise.reject(error.response.data);
                }
            }
            return Promise.reject(error);
        }
    );
}

/**
 * Stop Function excution still refresh token did't update
 */
const isRefreshTokenDone = async () => {
    if (isRefreshTokenUpdating) {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for one second
        return await isRefreshTokenDone();
    } else {
        return true;
    }
};
