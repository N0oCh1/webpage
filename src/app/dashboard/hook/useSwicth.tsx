import type { EnchufeData } from "../../../types";
import { useQuery } from "@tanstack/react-query";

export default function useEnchufe() {
    const {data, isLoading} = useQuery<EnchufeData>({
        queryKey: ['enchufe'],
        queryFn: async () => {
            const apiUrl = import.meta.env.ApiUrl || 'http://localhost:5282/Enchufe_Api/Enchufe';
            const response = await fetch(`${apiUrl}/obtener/2B09`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    return {data, isLoading}
}