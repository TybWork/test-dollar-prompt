import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTokenFunction } from "../getTokenFunction";

const fetchCart = async () => {
    const token = getTokenFunction().token
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/get`, {
        headers: {
            'Authorization': token
        }
    })
    return response.data.items;
}

export const useCartQuery = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart,
        staleTime: 30 * 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}