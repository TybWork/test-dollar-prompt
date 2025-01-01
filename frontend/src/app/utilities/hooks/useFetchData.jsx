'use client'
import axios from 'axios'
import { useState, useEffect } from 'react'

const useFetchData = ({ url }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(url)
                setData(response.data)

            } catch (error) {
                setError(`Error while fetching data ${error}`)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])

    return { data, loading, error }
}

export default useFetchData