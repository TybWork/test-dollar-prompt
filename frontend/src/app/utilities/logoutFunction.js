import axios from "axios";
export const logoutFunc = async () => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`, {}, {
            withCredentials: true
        });
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${process.env.NEXT_PUBLIC_DOMAIN_NAME}; secure; sameSite=None`;
    } catch (error) {
        console.error(`Failed to logout ${error}`);
    }
};