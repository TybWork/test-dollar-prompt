import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTokenFunction } from "../getTokenFunction";
import { jwtDecode } from "jwt-decode";
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
    const token = getTokenFunction().cookie
    let userRole = 'guest'
    if (token) {
        const decodeToken = jwtDecode(token)
        userRole = decodeToken.userRole || 'guest'
    }
    return useQuery({
        queryKey: ['cart'],
        queryFn: userRole === 'user' ? fetchCart : () => Promise.resolve([]),
        staleTime: 30 * 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: userRole === 'user'
    })
}