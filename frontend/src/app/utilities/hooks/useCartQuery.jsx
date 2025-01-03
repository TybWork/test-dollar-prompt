'use client'
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
    let userRole = 'guest'
    if (typeof window !== "undefined") {
        const token = getTokenFunction().cookie
        if (token) {
            const decodeToken = jwtDecode(token)
            userRole = decodeToken.userRole || 'guest'
        }
    }
    return useQuery({
        queryKey: ['cart'],
        queryFn: userRole === 'user' ? fetchCart : () => Promise.resolve([]),
        staleTime: 30 * 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: userRole === 'user'
    })
}

export const useLikeQuery = (promptModel, slug) => {
    return useQuery({
        queryKey: ['like', slug],  // Adding `promptId` to the query key ensures the query is unique per prompt.
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/prompt/${promptModel}/filter?slug=${slug}`
                );
                console.log('promptModel', promptModel)
                console.log('slug', slug)
                return response?.data[0]
            } catch (error) {
                console.error('Error fetching likes:', error);
                throw error;  // This will allow React Query to catch the error and handle it.
            }
        },
    });
};
