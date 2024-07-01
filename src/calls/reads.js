import { useQuery } from "react-query"
import axios, { BASE } from "./axios";
import { safeGet } from "@/utils";


export const useData = (payload, token="") => {
    return useQuery([payload], async () => {
        try {
            axios.defaults.withCredentials = true;
            axios.defaults.withXSRFToken = true;
            axios.defaults.baseURL = BASE;

            await axios.get('/sanctum/csrf-cookie');

            axios.defaults.baseURL  = BASE + "/api";

            const result = await axios.post(payload.target, {
                _method: 'get',
                ...payload.data,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });
            // if (payload.target.includes("articles")) 
            //     console.log(result)
            if (result.status == 200) {
                let data = safeGet(result, ["data", "data"], []);
                return data;
            }
            return false;
        }
        catch(e) {
            console.log(e);
            return false
        }
    });
}