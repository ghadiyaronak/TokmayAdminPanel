import axios from "axios";
import { BASE_URL } from "../utils/environments";



const configuration = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": ["Origin", "Accept", "X-Requested-With", "Content-Type", "Authorization"]
    }
};

const instance = axios.create({ configuration });

//this is the common entry point from all the apis will be called
instance.interceptors.request.use(
    async (config) => {
        let newHeaders = config.headers;
        //refresh token can be implemented here
        return Object.assign({}, config, { headers: newHeaders, baseURL: BASE_URL });
    },
    (error) => Promise.reject(error)
);

const client = () => instance;

export default client();
