import { useCallback } from "react";
import axios, { Method } from "axios";

export const useCallApi = (method: Method) => {

    const makeRequest = useCallback((url: string) => {
        return new Promise((resolve, reject) => {
            axios({
                method,
                url,
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => reject);
        });
    }, [method]);
    
    return [makeRequest];
};