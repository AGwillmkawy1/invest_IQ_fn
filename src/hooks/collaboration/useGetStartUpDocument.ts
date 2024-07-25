import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { ApiUrl } from "../../utils/api";

interface StartUpDoc {
    document:string
}

export default function useGetStartUpDocument({ businessId }: { businessId: string }) {
    const [isLoading, setIsLoadingState] = useState(false);
    const [document, setDocument] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    const fetchDocument = useCallback(async () => {
        if (!token) {
            toast.error("No token found");
            return;
        }

        setIsLoadingState(true);
        try {
            const response = await fetch(`${ApiUrl}/business-startup/doc/${businessId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json() as StartUpDoc;
            setDocument(data.document);
        } catch (error) {
            toast.error(`Error fetching document: ${error}`);
        } finally {
            setIsLoadingState(false);
        }
    }, [businessId, token]);

    useEffect(() => {
        fetchDocument();
    }, [fetchDocument]);

    return { isLoading, document, refetch: fetchDocument };
}
