import axios from "axios"
export const fetchDataFunc = async (url) => {
    try {
        const response = await axios.get(url)
        return { data: response.data }
    } catch (error) {
        return { error }
    }
}