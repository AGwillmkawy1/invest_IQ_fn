import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { ApiUrl } from "../../utils/api";
import { TStartUp} from "../../interfaces/interfaces.ts";

export default function useGetAllStartUps() {
    const [isLoading, setIsLoadingState] = useState(false);
    const [startUps, setStartUps] = useState<TStartUp[]>([]);
    const token = localStorage.getItem("token");

    const fetchStartUps = useCallback(async () => {
        if (!token) {
            toast.error("No token found");
            return;
        }

        setIsLoadingState(true);
        try {
            const response = await fetch(`${ApiUrl}/business-startup`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setStartUps(data);
        } catch (error) {
            toast.error(`Error fetching start ups: ${error}`);
        } finally {
            setIsLoadingState(false);
        }
    }, [token]);

    useEffect(() => {
        fetchStartUps();
    }, [fetchStartUps]);

    return { isLoading, startUps, refetch: fetchStartUps };
}