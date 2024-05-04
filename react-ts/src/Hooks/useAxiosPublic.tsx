import axios, { AxiosInstance } from "axios";

const axiosPublic: AxiosInstance = axios.create({
    baseURL: 'https://server-two-kohl.vercel.app/'
});

const useAxiosPublic = (): AxiosInstance => {
    return axiosPublic;
};

export default useAxiosPublic;
