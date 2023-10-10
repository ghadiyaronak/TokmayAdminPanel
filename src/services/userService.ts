import axios, { AxiosResponse } from "axios";
const userService = {
    getUsers: async (): Promise<any[]> => {
        const response: AxiosResponse<any[]> = await axios.get("https://api.example.com/users");
        return response.data;
    },
    createUser: async (userData: any): Promise<any> => {
        const response: AxiosResponse<any> = await axios.post("https://api.example.com/users", userData);
        return response.data;
    },
    updateUser: async (userId: number, userData: any): Promise<any> => {
        const response: AxiosResponse<any> = await axios.put(`https://api.example.com/users/${userId}`, userData);
        return response.data;
    },
    deleteUser: async (userId: number): Promise<void> => {
        await axios.delete(`https://api.example.com/users/${userId}`);
    }
};
